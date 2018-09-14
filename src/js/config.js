export const host = 'http://localhost:1310'
export const rsaPubKeyRelease = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYBqJdy/aU5q1krBvRBDUn6WivukGiSBmlEqJbeDSTGDkyxIW6+adOHwKZhF+bDRFMPWZcqV0v2fgMbKKgoQIlCzDFGNa+4bTV5HsFq261kmwKVRZIYsSYks9P4yrkA4FwmnwR0Rc8blYOhxsqqekHcWZVHFrnLSavOiAQake2XQIDAQAB'
// export const rsaPubKeyDev = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEo9qWXCI89ldwzLvTFNdbXAlIWHJmypkk+hxCZaKvtbIGvJTzDYjaRjrjGXYkpWd/AHZ9CPqFJxcNGq/rbCUDcptHLZsyjooYQ0m7TvRjRyMQHmBJWPZp7CrKqhsPwu4CU2fbbBTc99S7Uqdt5kOGl/KmeGT5tAUFzl1QQCionQIDAQAB'
export const rsaPubKeyDev = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCzuBY3cNawrzvL4Bzx8NG8vw7nsx208s9ZNcpMJpboXnQEsLsFE443NA5NBFAAG6dYaz54cpN8TppeaCkZ8gZ3zWu3adKCjrirFgSGPe88IE/To/rJrGpsMb9VyEWEi33c/Bxm+AYEUZCjIbY1CEXK/Xa3swCkabalCT7xe8IyoQIDAQAB'
// 需要登录的路由路径
export const isDev = process.env.NODE_ENV !== 'production'
export const rsaPubKey = isDev ? rsaPubKeyDev : rsaPubKeyRelease
export const needLogin = ['/bills']
export const enableLog = isDev
