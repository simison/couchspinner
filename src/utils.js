/**
 * Give out pretty date
 * @param  {String} date Date as a string
 * @return {String}
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export const scrollToRef = ref => ref.current.scrollIntoView({
  behavior: 'smooth'
});

/**
 * Test if browser supports sessionStorage or localStorage
 *
 * From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 *
 * @param  {[String]} type Either `sessionStorage` or `localStorage`
 * @return {[Boolean]}
 */
export function testStorage(type) {
    var storage;
    try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
}
