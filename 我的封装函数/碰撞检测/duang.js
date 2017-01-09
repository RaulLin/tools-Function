function Drag(json){
			var settings = {
				id:json.id,
				id2:json.id2,
				fnDuang:json.fnDuang,
				fnNoDuang:json.fnNoDuang
			}
			
			var obj = document.getElementById(settings.id);
			var obj2 = document.getElementById(settings.id2);
			obj.addEventListener('mousedown',fnDown);
			function fnDown(ev){
				var disX = ev.pageX - obj.offsetLeft;
				var disY = ev.pageY - obj.offsetTop;
				
				document.addEventListener('mousemove',fnMove);
				document.addEventListener('mouseup',fnUp);
				
				function fnMove(ev){
					obj.style.left = ev.pageX - disX + 'px';
					obj.style.top = ev.pageY - disY + 'px';
					
					//如果传入一个obj2 并且 obj2要是个元素 并且 碰到了
					if(obj2 && obj2.nodeType === 1 && duang(obj,obj2)){
						//fnDuang是不是一个函数
						if(settings.fnDuang && typeof settings.fnDuang === 'function'){
							settings.fnDuang(obj,obj2);
						}
					}else{
						//要传入一个fnNoDuang为真 并且 fnNoDuang为函数
						if(settings.fnNoDuang && typeof settings.fnNoDuang === 'function'){
							settings.fnNoDuang(obj,obj2);
						}
					}
					
				}
				function fnUp(){
					document.removeEventListener('mousemove',fnMove);
					document.removeEventListener('mouseup',fnUp);
				}				
				ev.preventDefault();//阻止默认行为
			}
		}
		
		function duang(obj1,obj2){
			var l1 = obj1.offsetLeft;
			var t1 = obj1.offsetTop;
			var b1 = t1 + obj1.offsetHeight;
			var r1 = l1 + obj1.offsetWidth;
			
			var l2 = obj2.offsetLeft;
			var t2 = obj2.offsetTop;
			var b2 = t2 + obj2.offsetHeight;
			var r2 = l2 + obj2.offsetWidth;
			
			if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
				//没碰到
				return false;
			}else{
				//碰到了
				return true;
			}
		}