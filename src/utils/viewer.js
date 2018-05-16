import Viewer from 'viewerjs'

export function initViewer(el){
	return new Viewer(document.getElementById(el));
}