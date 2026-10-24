export const asset = (path = '') =>
  `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

export const BOY = asset('/charectors/boy.png')
export const GIRL = asset('/charectors/girl.png')
