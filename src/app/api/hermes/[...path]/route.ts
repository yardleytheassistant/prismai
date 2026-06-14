import { NextRequest } from 'next/server'

const HERMES_URL = process.env.HERMES_URL ?? 'http://127.0.0.1:8642'
const HERMES_API_KEY = process.env.HERMES_API_KEY ?? ''

function hermesUrl(segments: string[], search: URLSearchParams): string {
  const query = search.toString()
  return `${HERMES_URL}/${segments.join('/')}${query ? '?' + query : ''}`
}

function hermesHeaders(extra?: HeadersInit): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...(HERMES_API_KEY ? { Authorization: `Bearer ${HERMES_API_KEY}` } : {}),
    ...extra,
  }
}

function passthrough(upstream: Response): Response {
  const ct = upstream.headers.get('content-type') ?? ''
  if (ct.includes('text/event-stream')) {
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
  return upstream
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const upstream = await fetch(hermesUrl(path, req.nextUrl.searchParams), {
    headers: hermesHeaders(),
    signal: req.signal,
  })
  return passthrough(upstream)
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const body = await req.text()
  const upstream = await fetch(hermesUrl(path, req.nextUrl.searchParams), {
    method: 'POST',
    headers: hermesHeaders(),
    body,
    signal: req.signal,
  })
  return passthrough(upstream)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const body = await req.text()
  const upstream = await fetch(hermesUrl(path, req.nextUrl.searchParams), {
    method: 'PATCH',
    headers: hermesHeaders(),
    body,
    signal: req.signal,
  })
  return passthrough(upstream)
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const upstream = await fetch(hermesUrl(path, req.nextUrl.searchParams), {
    method: 'DELETE',
    headers: hermesHeaders(),
    signal: req.signal,
  })
  return passthrough(upstream)
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
  })
}
