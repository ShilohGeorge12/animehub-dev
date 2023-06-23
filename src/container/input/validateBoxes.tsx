import { toast } from 'react-toastify';

export function validateRating(value: string) {
	const val = parseInt(value);
	if (val >= 0 && val <= 10) {
		return val;
	}
  toast.warning(`Rating must be btw 0 - 10 and not ${val}`, {position: 'bottom-right'});
}


export function validateEpisodes( value: string ){
  const val = parseInt(value);
  if( val >= 0 && val <= 2000 ){
    return val;
  }
  toast.warning(`Rating must be btw 0 - 2000 and not ${val}, `, {position: 'bottom-right'});
};

export function validateYear( value: string ){
  const val = parseInt(value);
  if( val >= 0 ){
    return val;
  }
  toast.warning(`Rating must be greater 0 and not ${val}`, {position: 'bottom-right'});
};