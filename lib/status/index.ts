import * as realtime from "../realtime/realtime";

import * as config from "../config";


export async function getStatus(req, res) {
  res.set({
    'Cache-Control': 'private', // only cache by client
    'X-Robots-Tag': 'noindex, nofollow', // prevent crawling
    'Content-Type': 'application/json'
  })

  try {
    const data = await realtime.getStatus()
    res.send(data)
  } catch (e) {
    console.error(e)
    res.status(500).send(e.toString())
  }
}

export async function getMetrics(req, res) {
  const data = await realtime.getStatus()

  res.set({
    'Cache-Control': 'private', // only cache by client
    'X-Robots-Tag': 'noindex, nofollow', // prevent crawling
    'Content-Type': 'text/plain; charset=utf-8'
  })
  res.render('../js/lib/common/metrics.ejs', data)
}

export function getConfig(req, res) {
  const data = {
    domain: config.domain,
    urlpath: config.urlPath,
    debug: config.debug,
    version: config.fullversion,
    plantumlServer: config.plantuml.server,
    DROPBOX_APP_KEY: config.dropbox.appKey,
    allowedUploadMimeTypes: config.allowedUploadMimeTypes,
    defaultUseHardbreak: config.defaultUseHardbreak,
    linkifyHeaderStyle: config.linkifyHeaderStyle,
    useCDN: config.useCDN,
    defaultTocDepth: config.defaultTocDepth
  }
  res.set({
    'Cache-Control': 'private', // only cache by client
    'X-Robots-Tag': 'noindex, nofollow', // prevent crawling
    'Content-Type': 'application/javascript'
  })
  res.render('../js/lib/common/constant.ejs', data)
}