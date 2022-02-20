import { Player } from '@/types/Player'
import { ImageAI } from './ImageAI'

/**
 * JudgeResult type.
 */
export type JudgeResult = {
  winner?: Player
  draw?: true
  judges: JudgeTurnResult[]
}

/**
 * JudgeTurnResult type.
 */
export type JudgeTurnResult = {
  winner?: Player
  winnerProbability?: number
  loserProbability?: number
  draw?: true
  image: ImageWithLabel
  correct1: boolean
  correct2: boolean
}

/**
 * ImageWithLabel type.
 */
export type ImageWithLabel = {
  image: HTMLImageElement
  label: string
}

/**
 * HandwrittenNumberGame class.
 */
export class HandwrittenNumberGame {
  url1: string
  url2: string

  onJudgeTurn?: (judge: JudgeTurnResult) => void

  constructor(private p1: Player, private p2: Player) {
    if (!p1.modelURL || !p2.modelURL) {
      throw new Error('モデルURLが設定されていません')
    }

    this.url1 = p1.modelURL
    this.url2 = p2.modelURL
  }

  async judge(): Promise<JudgeResult> {
    const images = await this.loadImages()
    console.log({ url1: this.url1, url2: this.url2 })
    const ai1 = new ImageAI(this.url1)
    const ai2 = new ImageAI(this.url2)

    await ai1.load()
    await ai2.load()

    let count1 = 0
    let count2 = 0
    const judges: JudgeTurnResult[] = []
    console.log(images)

    for (const img of images) {
      const { image, label } = img
      const [result1, pro1] = await ai1.predict(image)
      const [result2, pro2] = await ai2.predict(image)

      let point1 = 0
      let point2 = 0
      let correct1 = false
      let correct2 = false

      if (result1 === label.toString()) {
        point1 += pro1
        correct1 = true
      }

      if (result2 === label.toString()) {
        point2 += pro2
        correct2 = true
      }

      if (point1 === point2) {
        judges.push({
          draw: true,
          image: img,
          correct1,
          correct2,
        })
      } else if (point1 > point2) {
        judges.push({
          winner: this.p1,
          winnerProbability: pro1,
          loserProbability: pro2,
          image: img,
          correct1,
          correct2,
        })
      } else if (point2 > point1) {
        judges.push({
          winner: this.p2,
          winnerProbability: pro2,
          loserProbability: pro1,
          image: img,
          correct1,
          correct2,
        })
      }

      const j = judges[judges.length - 1]
      this.onJudgeTurn && this.onJudgeTurn(j)

      count1 += point1
      count2 += point2
    }

    console.log(`${count1} vs ${count2}`)

    if (count1 === count2) {
      return {
        draw: true,
        judges,
      }
    }

    if (count1 > count2) {
      return {
        winner: this.p1,
        judges,
      }
    }

    return {
      winner: this.p2,
      judges,
    }
  }

  private async loadImages(): Promise<ImageWithLabel[]> {
    const images: ImageWithLabel[] = []

    for (let i = 0; i < 10; i++) {
      for (let k = 0; k < 10; k++) {
        const image = new Image()
        image.src = `/handwritten-numbers/${i}/${k}.png`
        images.push({
          image,
          label: i.toString(),
        })
      }
    }

    await Promise.all(
      images.map(
        (img) => new Promise((resolve) => (img.image.onload = resolve))
      )
    )

    return images
  }
}
