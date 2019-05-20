import request from '@/common/js/request'

export function getTopList() {
  const url1 = 'top/list?idx=0'
  const url2 = 'top/list?idx=1'
  const url3 = 'top/list?idx=2'
  const url4 = 'top/list?idx=3'
  const url5 = 'top/list?idx=4'
  const url6 = 'top/list?idx=7'
  const url7 = 'top/list?idx=14'
  const url8 = 'top/list?idx=15'
  const requestArr = [
    request.get(url1),
    request.get(url2),
    request.get(url3),
    request.get(url4),
    request.get(url5),
    request.get(url6),
    request.get(url7),
    request.get(url8)
  ]
  return Promise.all(requestArr).then(resArr => {
    const topList = []
    resArr.forEach(res => {
      topList.push(res.data.playlist)
    })
    return topList
  })
}
