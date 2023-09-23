import { JsonHigh } from 'https://cdn.jsdelivr.net/npm/@xtao-org/jsonhilo/mod.min.js'

const decoder = new TextDecoder()

let tree, keys

function init() {
   tree = [], keys = []
}
function updateParent() {
   let current = tree.pop()
   if (tree.length == 0)
      return
   else
      addValue(current)

   if (tree.length == 1)
      self.postMessage(current)
}

function open(struct) {
   let current;
   if (struct == "Array")
      current = []
   else
      current = {}

   tree.push(current)
}

function addValue(val) {
   const currentPos = tree.length - 1
   const currentStruct = tree[currentPos]

   if (Array.isArray(currentStruct)) {
      currentStruct.push(val)
   }
   else {
      if (keys[currentPos] === undefined) {
         throw new Error(`Found value ${val} with no key at depth ${currentPos}`)

      }
      currentStruct[keys[currentPos]] = val
      keys[currentPos] = undefined
   }
}

async function getData(url) {
   console.log("getting data")
   init()
   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`${response.status}  ${response.statusText}`)
   }
   const stream = JsonHigh({
      openArray: () => open("Array"),
      openObject: () => open("Dict"),
      closeArray: () => updateParent(),
      closeObject: () => updateParent(),
      key: (key) => {
         keys[tree.length - 1] = key
      },
      value: (value) => addValue(value)
   })

   for await (const chunk of res.body) {
      const ch = decoder.decode(chunk)
      stream.chunk(ch)
   }
}

onmessage = function (e) {
   getData(e.data)
}
