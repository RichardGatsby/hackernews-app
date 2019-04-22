import Utils from './utils'
test('converts unixtime to human readable format', () => {
  expect(Utils.unixTimeToString(1231231)).toBe('Jan-15-1970 8:00:31');
});