import type { Request, Response, NextFunction } from "express"
import BusinessError from "../errors/BusinessError"

export const getDirection = async (req: Request, res: Response, next: NextFunction) => {
  const { heading, target } = req.query
  const h = parseFloat(heading as string)
  const t = parseFloat(target as string)

  //errorUse on app.ts catch the exceptions
  if (!heading || isNaN(h) || h < 0 || h >= 360) throw new BusinessError(400, "'heading' value is invalid, should be a number between 0 and 359")

  if (!target || isNaN(t) || t < 0 || t >= 360) return next(new BusinessError(400, "'to' field is invalid, should be a number between 0 and 359"))

  const direction = h === t ? "straight" : ((h - t + 360) % 360 > 180 ? "right" : "left")

  res.status(200).json({ direction })
}
