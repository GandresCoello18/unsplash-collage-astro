export interface UnsplashImage {
  id: string
  slug: string
  alternative_slugs: AlternativeSlugs
  created_at: string
  updated_at: string
  promoted_at: any
  width: number
  height: number
  color: string
  blur_hash: string
  description: any
  alt_description: any
  breadcrumbs: any[]
  urls: Urls
  links: Links
  likes: number
  liked_by_user: boolean
  bookmarked: boolean
  current_user_collections: any[]
  sponsorship: Sponsorship
  topic_submissions: TopicSubmissions
  asset_type: string
  user: User
}

export interface AlternativeSlugs {
  en: string
  es: string
  ja: string
  fr: string
  it: string
  ko: string
  de: string
  pt: string
  id: string
}

export interface Urls {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3: string
}

export interface Links {
  self: string
  html: string
  download: string
  download_location: string
}

export interface Sponsorship {
  impression_urls: any[]
  tagline: string
  tagline_url: string
  sponsor: Sponsor
}

export interface Sponsor {
  id: string
  updated_at: string
  username: string
  name: string
  first_name: string
  last_name: any
  twitter_username: any
  portfolio_url: string
  bio: string
  location: any
  links: Links2
  profile_image: ProfileImage
  instagram_username: string
  total_collections: number
  total_likes: number
  total_photos: number
  total_free_photos: number
  total_promoted_photos: number
  total_illustrations: number
  total_free_illustrations: number
  total_promoted_illustrations: number
  accepted_tos: boolean
  for_hire: boolean
  social: Social
}

export interface Links2 {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
}

export interface ProfileImage {
  small: string
  medium: string
  large: string
}

export interface Social {
  instagram_username: string
  portfolio_url: string
  twitter_username: any
  paypal_email: any
}

export interface TopicSubmissions {}

export interface User {
  id: string
  updated_at: string
  username: string
  name: string
  first_name: string
  last_name: any
  twitter_username: any
  portfolio_url: string
  bio: string
  location: any
  links: Links3
  profile_image: ProfileImage2
  instagram_username: string
  total_collections: number
  total_likes: number
  total_photos: number
  total_free_photos: number
  total_promoted_photos: number
  total_illustrations: number
  total_free_illustrations: number
  total_promoted_illustrations: number
  accepted_tos: boolean
  for_hire: boolean
  social: Social2
}

export interface Links3 {
  self: string
  html: string
  photos: string
  likes: string
  portfolio: string
}

export interface ProfileImage2 {
  small: string
  medium: string
  large: string
}

export interface Social2 {
  instagram_username: string
  portfolio_url: string
  twitter_username: any
  paypal_email: any
}
