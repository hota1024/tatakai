import { randomPick } from './randomPick'

const first = [
  '屈指の',
  '最強の',
  '世界一の',
  '赤い',
  '青い',
  'かなりの',
  'それなりの',
  'ヤバメの',
]
const middle = [
  'イヌ好きな',
  'ネコ好きな',
  'AI好きな',
  '本好きな',
  '魚が好きな',
  '野菜が好きな',
  '優しそうな',
  '怖そうな',
  '面白そうな',
]
const last = [
  'AIマスター',
  'ネコ',
  'イヌ',
  '園児',
  '小学生',
  '中学生',
  '高校生',
  '大学生',
  '社会人',
]

/**
 * generate random name.
 */
export const randomName = () => {
  return randomPick(first) + randomPick(middle) + randomPick(last)
}
