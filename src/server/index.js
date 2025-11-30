import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import pool from './db/index.js'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: ['http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

// Health check
app.get('/', (c) => c.json({ message: 'Sakeenah API is running' }))

// ============ Invitation API ============

// Get invitation by UID
app.get('/api/invitation/:uid', async (c) => {
  const { uid } = c.req.param()
  try {
    const result = await pool.query(
      'SELECT * FROM invitations WHERE uid = $1',
      [uid]
    )
    if (result.rows.length === 0) {
      return c.json({ success: false, error: 'Invitation not found' }, 404)
    }
    return c.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Error fetching invitation:', error)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// ============ Wishes API ============

// Get all wishes for an invitation
app.get('/api/:uid/wishes', async (c) => {
  const { uid } = c.req.param()
  const limit = parseInt(c.req.query('limit') || '50')
  const offset = parseInt(c.req.query('offset') || '0')

  try {
    // Verify invitation exists
    const invitation = await pool.query(
      'SELECT uid FROM invitations WHERE uid = $1',
      [uid]
    )
    if (invitation.rows.length === 0) {
      return c.json({ success: false, error: 'Invitation not found' }, 404)
    }

    // Get wishes
    const result = await pool.query(
      `SELECT id, name, message, attendance, created_at 
       FROM wishes 
       WHERE invitation_uid = $1 
       ORDER BY created_at DESC 
       LIMIT $2 OFFSET $3`,
      [uid, limit, offset]
    )

    // Get total count
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM wishes WHERE invitation_uid = $1',
      [uid]
    )

    return c.json({
      success: true,
      data: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        limit,
        offset
      }
    })
  } catch (error) {
    console.error('Error fetching wishes:', error)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// Create a new wish
app.post('/api/:uid/wishes', async (c) => {
  const { uid } = c.req.param()

  try {
    const body = await c.req.json()
    const { name, message, attendance } = body

    // Validation
    if (!name?.trim() || !message?.trim()) {
      return c.json({ success: false, error: 'Name and message are required' }, 400)
    }

    const validAttendance = ['ATTENDING', 'NOT_ATTENDING', 'MAYBE']
    const attendanceValue = validAttendance.includes(attendance) ? attendance : 'MAYBE'

    // Verify invitation exists
    const invitation = await pool.query(
      'SELECT uid FROM invitations WHERE uid = $1',
      [uid]
    )
    if (invitation.rows.length === 0) {
      return c.json({ success: false, error: 'Invitation not found' }, 404)
    }

    // Insert wish
    const result = await pool.query(
      `INSERT INTO wishes (invitation_uid, name, message, attendance)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, message, attendance, created_at`,
      [uid, name.trim(), message.trim(), attendanceValue]
    )

    return c.json({ success: true, data: result.rows[0] }, 201)
  } catch (error) {
    console.error('Error creating wish:', error)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// Delete a wish (optional - for admin)
app.delete('/api/:uid/wishes/:id', async (c) => {
  const { uid, id } = c.req.param()

  try {
    const result = await pool.query(
      'DELETE FROM wishes WHERE id = $1 AND invitation_uid = $2 RETURNING id',
      [id, uid]
    )

    if (result.rows.length === 0) {
      return c.json({ success: false, error: 'Wish not found' }, 404)
    }

    return c.json({ success: true, message: 'Wish deleted' })
  } catch (error) {
    console.error('Error deleting wish:', error)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// Get attendance stats
app.get('/api/:uid/stats', async (c) => {
  const { uid } = c.req.param()

  try {
    const result = await pool.query(
      `SELECT 
        COUNT(*) FILTER (WHERE attendance = 'ATTENDING') as attending,
        COUNT(*) FILTER (WHERE attendance = 'NOT_ATTENDING') as not_attending,
        COUNT(*) FILTER (WHERE attendance = 'MAYBE') as maybe,
        COUNT(*) as total
       FROM wishes 
       WHERE invitation_uid = $1`,
      [uid]
    )

    return c.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return c.json({ success: false, error: 'Internal server error' }, 500)
  }
})

// Start server
const port = process.env.PORT || 3000
console.log(`🚀 Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})