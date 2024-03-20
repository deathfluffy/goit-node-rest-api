import Jimp from 'jimp'
export const resizeImage = async (path, width = 250, height = 250, mode = Jimp.RESIZE_BEZIER) => {
    const image = await Jimp.read(path);
    await image.resize(width, height, mode);
    await image.writeAsync(path);
}