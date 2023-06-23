class ImageError extends Error{
  constructor( public message: string, ){
    super( message );
  }
}

export default ImageError;