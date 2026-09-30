import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noIndex?: boolean
}

export function useSEO({ title, description, canonical, ogImage, noIndex }: SEOProps) {
  useEffect(() => {
    document.title = title

    const pageUrl = canonical || window.location.href

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', pageUrl)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    if (ogImage) {
      setMeta('property', 'og:image', ogImage)
      setMeta('name', 'twitter:card', 'summary_large_image')
      setMeta('name', 'twitter:image', ogImage)
    }
    setLink('canonical', pageUrl)
    if (noIndex) setMeta('name', 'robots', 'noindex, nofollow')
    else removeMeta('name', 'robots')
  }, [title, description, canonical, ogImage, noIndex])
}

function setMeta(attrName: string, attrValue: string, content: string) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.content = content
}

function removeMeta(attrName: string, attrValue: string) {
  const el = document.querySelector(`meta[${attrName}="${attrValue}"]`)
  if (el) el.remove()
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}
