
   
/* consoleimg v1.0 - chris johnson / @defaced */
export const consoleimg = (function () {
    if(typeof window !== "undefined") {
    return {
      load: function (i, { size: s = 320, color: c = 'transparent' } = {}) {
        const r = new FileReader()
        r.addEventListener('load', function () {
          /* Format the CSS string for console.log */
          const o = 'background: url(\'' + r.result + '\') left top no-repeat; font-size: ' + s + 'px; background-size: contain; background-color:' + c
          /* Output to the console. */
          
          console.log('%c     ', o)
          console.log(`%c
  Hey there, you opened the console 🥰
  
  "Talent is a pursued interest.
  Anything that you're willing to practice, 
  you can do."  -Bob Ross
  `, 'color: #663399; font-size: 1.5rem; font-weight: bold; font-family: Helvetica;');
        }, false)
        fetch(i)
        /* Return the data as a blob. */
          .then(r => r.blob())
          .then(b => {
            /* Only proceed if the blob is an image. */
            if (b.type.indexOf('image') === 0) {
              /* Warn if larger than the 8KB that Firefox allows. */
              if (b.size > 8192 && navigator.userAgent.indexOf('Firefox') > 0) {
                throw new Error('Image size too big to be displayed in Firefox.')
              }
              return b
            } else {
              /* Warn if the blob is not an image. */
              throw new Error('Valid image not found.')
            }
          })
          /* Read the blob as base64. */
          .then(i => r.readAsDataURL(i))
          .catch(e => console.warn(e.message))
      }
    }} else {
      return null;
    }
  })()