function myWheel(obj,callback){
	obj.addEventListener('DOMMouseScroll',whellFn);
	obj.addEventListener('mousewheel',whellFn);
	function whellFn(ev){
		var down = true;
		if(ev.wheelDelta){
			down = ev.wheelDelta > 0 ? true : false;
		}else{
			down = ev.detail < 0 ? true : false;
		}
		if(callback && typeof callback === 'function'){
			callback(down);
		}
		ev.preventDefault();
	}
}