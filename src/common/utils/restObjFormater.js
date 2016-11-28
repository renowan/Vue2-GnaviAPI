const restObjFormater = (rest) => {
  const replace = (target) => {
    return typeof target !== 'string' ? '' : target
  }

  const label = [
    'address',
    'category',
    'url',
    'url_mobile',
    'tel',
    'tel_sub',
    'fax',
    'opentime',
    'holiday',
    'parking_lots',
    'budget',
    'party',
    'lunch',
    'credit_card',
    'e_money'
  ]

  label.forEach((elm) => {
    rest[elm] = replace(rest[elm])
  })

  const labelMult = [
    'coupon_url',
    'image_url',
    'access',
    'pr',
  ]

  labelMult.forEach((elm) => {
    // console.log(rest[elm])
    for (var i in rest[elm]) {
      if (rest[elm].hasOwnProperty(i)) {
        rest[elm][i] = replace(rest[elm][i])
      }
    }
  })

  // console.log('=================')
  return rest
}

export default restObjFormater
