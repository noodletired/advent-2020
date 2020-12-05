{
  window.Run4 = function(data)
  {
    const formatted = FormatData(data)
    console.log('Data:', formatted)
    return [
      Algorithm1([...formatted]),
      Algorithm2([...formatted])
    ]
  }


  function FormatData(data)
  {
    return data.split(/\n\n/gm)   // each passport is separated by a two-line break
      .filter(el => !!el)         // filter out empty results
      .map(str => 
        str.trim()                // trim whitespace
          .split(/\s|\n/gm)       // split passport entries by whitespace or newlines 
          .filter(el => !!el)     // filter empty
          .map(str =>
            str.split(':')        // split into key:value
          )
      ).map(arr => Object.fromEntries(arr))   // produces Array<Passport> like [{"byr":"1992", ...}, ...]
  }


  function Algorithm1(data)
  {
    const requiredKeys = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
    return data.reduce( (count, passport) => (
      count + requiredKeys.every(key => Object.keys(passport).includes(key))
    ), 0)
  }


  function Algorithm2(data)
  {  
    const boundNumber = (data, min, max) => parseInt(data,10) >= min && parseInt(data,10) <= max
    const requirements = [
      {key: 'byr', valid: (data) => boundNumber(data, 1920, 2002)},
      {key: 'iyr', valid: (data) => boundNumber(data, 2010, 2020)},
      {key: 'eyr', valid: (data) => boundNumber(data, 2020, 2030)},
      {key: 'hgt', valid: (data) => 
        data.slice(-2) === 'cm' ? boundNumber(data, 150, 193) : 
        data.slice(-2) === 'in' ? boundNumber(data, 59, 76) :
        false
      },
      {key: 'hcl', valid: (data) => /^#[a-f0-9]{6}$/.test(data)},
      {key: 'ecl', valid: (data) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(data)},
      {key: 'pid', valid: (data) => /^[0-9]{9}$/.test(data)}
    ]

    return data.reduce( (count, passport) => (
      count + requirements.every(req => 
        Object.entries(passport).some(([key, value]) => 
          req.key === key && 
          req.valid(value)
        )
      )
    ), 0)
  }
}