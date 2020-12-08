{
  window.Run7 = function(data)
  {
    const formatted = FormatData(data)
    console.log('Data:', formatted)
    return [
      FindAllFits(formatted, 'shiny gold', 1).size,
      CountAllChildren(formatted, 'shiny gold')
    ]
  }


  function FormatData(data)
  {
    // Map data to [ [colour, [colour, count], ...], ...] ]
    // Access e.g. rules[colour].keys().contains(x) to check if a bag can hold another bag
    return data
      .split(/\n/gm)              // each rule is separated by a line break
      .filter(el => !!el)         // filter out empty results
      .map(line => line
        .split(' bags contain ')
        .reduce( (name, contains) => [name,  
          (contains
            .match(/\d ([a-z]* [a-z]*)(?= bag)/g) || []) // contains nothing if doesn't match
            .map(inside => inside
              .replace(' ', '$')
              .split('$')
              .reduceRight( (name, number) => [name, parseInt(number, 10)] ) // [name, count] Object.entries style
            )
          ]
        )
      )
  }
  
  
  // Gets any bag colour names which directly support holding n-coloured bags
  function FindDirectParents(data, colour, count)
  {
    return data
      .filter( ([_, contains]) => contains
        .some( ([ruleColour, ruleCount]) => 
          ruleColour === colour && ruleCount >= count
        )
      ).map( ([parentName, _]) => parentName )
  }


  // Recurses until no parents are found
  function FindAllFits(data, colour, count)
  {
    return FindDirectParents(...arguments)
      .reduce( (set, parentName) => 
        new Set([...set, parentName, ...FindAllFits(data, parentName, 1)])
      , new Set())
  }
  

  // Gets any bag colour names and count held within a specified colour
  function FindDirectChildren(data, colour)
  {
    return data.find( ([parentName, _]) => parentName === colour )[1]
  }


  // Recursively counts all child bags
  function CountAllChildren(data, colour)
  {
    return FindDirectChildren(...arguments)
      .reduce( (count, [childColour, childCount]) => 
        count + childCount * (1 + CountAllChildren(data, childColour))
      , 0)
  }
}