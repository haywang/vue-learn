class Dep{
	constructor(){
		this.subs = [];
	}

	addSub(sub){
		this.subs.push(sub);
	}

	notify(){
		this.subs.forEach((sub)=>{
			sub.update()
		})
	}
}

class Watcher{
	constructor(){
		Dep.target = this;
	}

	update(){
		console.log("视图更新啦");
	}
}

Dep.target = null;

function defineReactive(obj, key, val){
	const dep = new Dep();

	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter(){
			dep.addSub(Dep.target);
			return val;
		},
		set: function reactiveSetter (newVal){
			if(newVal === val) return;
			dep.notify();
		}
	});
}

class Vue{
	constructor(option){
		this._data = option.data;
		observer(this._data);
		new Watcher();
		console.log('render~', this._data.test)
	}
}