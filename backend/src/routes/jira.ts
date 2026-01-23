import express from 'express'
import fetch from 'node-fetch'
import { z } from 'zod'

export const jiraRouter = express.Router()

// Schemas for validation
const JiraConfigSchema = z.object({
    baseUrl: z.string().url(),
    email: z.string().email(),
    apiKey: z.string().min(1)
})

const SearchStoriesSchema = z.object({
    config: JiraConfigSchema,
    projectKey: z.string().optional()
})

// Helper to remove trailing slash
const cleanUrl = (url: string) => url.replace(/\/$/, '').trim()

/**
 * -------------------------------------------------------
 *  CONNECT ROUTE — validates credentials using /myself
 * -------------------------------------------------------
 */
jiraRouter.post('/connect', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const validation = JiraConfigSchema.safeParse(req.body)
        if (!validation.success) {
            res.status(400).json({ error: validation.error.message })
            return
        }

        const { baseUrl, email, apiKey } = validation.data
        const authHeader = `Basic ${Buffer.from(`${email}:${apiKey}`).toString('base64')}`

        const myselfUrl = `${cleanUrl(baseUrl)}/rest/api/3/myself`
        console.log(`[Jira Connect] Validating against: ${myselfUrl}`)

        const jiraRes = await fetch(myselfUrl, {
            headers: {
                'Authorization': authHeader,
                'Accept': 'application/json'
            }
        })

        if (!jiraRes.ok) {
            const errorText = await jiraRes.text()
            console.error('Jira Connection Failed:', jiraRes.status, errorText)
            res.status(jiraRes.status).json({ error: 'Failed to connect to Jira. Check credentials.' })
            return
        }

        const userData = await jiraRes.json()
        res.json({ status: 'connected', user: userData })

    } catch (error) {
        console.error('Jira Connect Error:', error)
        res.status(500).json({ error: 'Internal server error while connecting to Jira' })
    }
})

/**
 * -------------------------------------------------------
 *  STORIES ROUTE — fetches user stories using new API
 * -------------------------------------------------------
 */
jiraRouter.post('/stories', async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const validation = JiraConfigSchema.safeParse(req.body.config)
        if (!validation.success) {
            res.status(400).json({ error: validation.error.message })
            return
        }

        const { baseUrl, email, apiKey } = validation.data
        const authHeader = `Basic ${Buffer.from(`${email}:${apiKey}`).toString('base64')}`

        // Default JQL
        const jql = 'issuetype = Story ORDER BY created DESC'

        // NEW REQUIRED ENDPOINT (old one is removed)
        const searchUrl = `${cleanUrl(baseUrl)}/rest/api/3/search/jql`

        console.log(`[Jira Stories] Requesting URL: ${searchUrl} with JQL: ${jql}`)

        const jiraRes = await fetch(searchUrl, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                jql,
                maxResults: 50,
                fields: ['summary', 'description']
            })
        })

        if (!jiraRes.ok) {
            const errorText = await jiraRes.text()
            console.error(`[Jira Stories Error] Status: ${jiraRes.status}, Body: ${errorText}`)
            res.status(jiraRes.status).json({
                error: `Failed to fetch stories: ${jiraRes.statusText}`,
                details: errorText
            })
            return
        }

        const data: any = await jiraRes.json()

        const stories = data.issues.map((issue: any) => ({
            id: issue.key,
            title: issue.fields.summary,
            description:
                typeof issue.fields.description === 'string'
                    ? issue.fields.description
                    : JSON.stringify(issue.fields.description),
            acceptanceCriteria: issue.fields.description
            //'Fetching acceptance criteria requires knowing the custom field ID for your Jira instance.'
        }))

        res.json({ stories })

    } catch (error) {
        console.error('Jira Stories Error:', error)
        res.status(500).json({ error: 'Internal server error while fetching stories' })
    }
})
