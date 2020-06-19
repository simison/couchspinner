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
