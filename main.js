const LoadAdventScript = function(date)
{
  return new Promise(resolve => {
    const script = document.createElement('script')
    script.onload = () => resolve(true)
    script.src = `modules/${date}.js`
    document.getElementById('scripts').appendChild(script)
  })
}


const GenerateAdventHTML = function(date)
{
  const parser = new DOMParser()
  const fragment = parser.parseFromString(`
    <div id="advent-entry-${date}" class="advent-entry">
      <a href="https://adventofcode.com/2020/day/${date}" title="See details in a new tab" target="_blank">[>>]</a>
      <h3>Day ${date}</h3>
      <div class="file-input" onclick="this.children[0].click(event)">
        <input type="file" accept=".txt" onchange="RunAdventScript(event, ${date})"/>
      </div>
      <div id="answer-1-${date}" class="answer">~</div>
      <div id="answer-2-${date}" class="answer">~</div>      
    </div>
  `, 'text/html')

  document.body.appendChild(fragment.body.firstChild)
}


const ShowAdventResults = function(date, results)
{
  results.forEach( (result, index) => {
    const id = index + 1;
    const el = document.getElementById(`answer-${id}-${date}`)
    el.innerHTML = `A${id}: ${result}`
  })
}


const RunAdventScript = function(e, date)
{
  e = e || window.event
  const fileList = e.target.files
  
  const reader = new FileReader()  
  reader.onload = async (e) => {
    const data = e.target.result
    const results = await window[`Run${date}`](data)
    ShowAdventResults(date, results)
  }
  reader.readAsText(fileList[0])
}


const main = async function()
{
  const today = new Date();
  let adventDay = 31;
  if (today.getFullYear() === 2020)
  {
    // Make the advent calendar available based on current date
    adventDay = today.getDate()
  }

  for (let date=1; date<=adventDay; date++)
  {
    if (await LoadAdventScript(date))
    {
      GenerateAdventHTML(date)
    }
  }
}()