var LocalStorage = (function(){
	return {
		setLocalStorage: function(key,objectData){
			localStorage.setItem(key,JSON.stringify(objectData));
		},
		getLocalStorage: function(key){
			return JSON.parse(localStorage.getItem(key));
		},
		removeLocalStorage: function(key){
			return localStorage.removeItem(key);
		}
	}
})();