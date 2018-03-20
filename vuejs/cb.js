class Dep{
	constructor(){
		this.subs = [];
	}

	addSub(sub){
		console.log("Dep:addSub")
		this.subs.push(sub);
	}

	notify(){
		console.log("Dep:notify")
		this.subs.forEach((sub)=>{
			sub.update();
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

function defineReactive(obj, key, val){
	const dep = new Dep();

	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get: function reactiveGetter(){
			console.log("defineReactive: get")
			dep.addSub(Dep.target);
			return val;
		},
		set: function reactiveSetter (newVal){
			console.log("defineReactive: set")
			if(newVal === val) return;
			dep.notify();
		}
	});
}

function observer(value){
	if(!value || (typeof value !=='object')){
		return;
	}

	Object.keys(value).forEach((key) => {
		defineReactive(value, key, value[key]);
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

let o = new Vue({
	data: {
		test: "I am test"
	}
})

o._data.test = "hello test"

Dep.target = null;