import { compareAsc, format } from 'date-fns'
export default formatDate = (date) => {
  const d = new Date(date);
// Results below assume UTC timezone - your results may vary

  return format(d, 'dd.MM.yyyy')
}