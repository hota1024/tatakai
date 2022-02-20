import * as tf from '@tensorflow/tfjs'
import * as tmImage from '@teachablemachine/image'
import { joinURL } from 'ufo'

/**
 * ImageAI class.
 */
export class ImageAI {
  model!: tmImage.CustomMobileNet
  maxPredictions!: number

  constructor(private url: string) {}

  async load() {
    const modelURL = joinURL(this.url, 'model.json')
    const metadataURL = joinURL(this.url, 'metadata.json')

    this.model = await tmImage.load(modelURL, metadataURL)
    this.maxPredictions = await this.model.getTotalClasses()
  }

  async predict(image: HTMLImageElement): Promise<[string, number]> {
    const prediction = await this.model.predict(image)
    const sorted = prediction.sort((a, b) => b.probability - a.probability)
    console.log(this.url, image.src, sorted)

    return [sorted[0].className, sorted[0].probability]
  }
}
