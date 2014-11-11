var $ = function(id){
	return document.querySelectorAll(id);
};

var isDate = function(obj)
{
	var date = obj.match(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/);
	if(date != null && date != undefined && date.length > 0)
	{
		return date[0].replace(/\//g,'');
	}
	return false;
};

var mapDom = {
	
	elementDom:{val:[],all:[]},

	congif:{elements:['div'], mapTag:['index']},

	getElements:function(){
		this.elementDom.val = [];
		for(x in this.congif.elements)
		{
			el = $(this.congif.elements[x] + '[' + this.congif.mapTag[0] + ']');
			if(el != undefined)
			{
				this.elementDom.val.push(el);
				for(y in el)
				{
					if(el[y] instanceof Element)
					{
						this.elementDom.all.push(el[y]);
					}
				}
			}
		}

		return this;

	},//Fim funcao ORDER

	order:function(obj){
		if(obj instanceof Object)
		{
			if(obj.mapTag != undefined && typeof obj.mapTag == "string")
			{
				for(x in this.congif.mapTag)
				{
					if(this.congif.mapTag[x] == obj.mapTag)
					{
						var attr = obj.mapTag;

						for(y in this.elementDom.all)
						{
							var ell = isDate(this.elementDom.all[y].getAttribute(attr));
							if(ell != false)
							{
								this.elementDom.all[y].setAttribute(attr, ell);
							}
						}
						this.elementDom.all.sort(function(a, b){return a.getAttribute(attr) - b.getAttribute(attr)});
					}
				}
			}
		}
		else if(typeof obj == 'string')
		{
			for(x in this.congif.mapTag)
				{
					if(this.congif.mapTag[x] == obj)
					{
						var attr = obj;

						for(y in this.elementDom.all)
						{
							var ell = isDate(this.elementDom.all[y].getAttribute(attr));
							if(ell != false)
							{
								this.elementDom.all[y].setAttribute(attr, ell);
							}
						}

						this.elementDom.all.sort(function(a, b){return a.getAttribute(attr) - b.getAttribute(attr)});
					}
				}
		}
		return this;
	},

	getDom:function(){
		return this.elementDom.all
	},

	reverse:function(){
		this.elementDom.all.reverse();
		return this;
	},

	filter:function(obj){
		var filters = {elements:[], mapTag:[]};
		for(x in obj)
		{
			if(x == 'elements')
			{
				filters.elements = obj[x];
			}

			if(x == 'mapTag')
			{
				filters.mapTag = obj[x];
			}
		}
			var doms = [];

			for(x in this.elementDom.all)
			{
				var haveFilter = true;

				if(filters.elements.length > 0)
				{
					for(y in filters.elements)
					{
						if(this.elementDom.all[x].localName == filters.elements[y])
						{
							haveFilter = true;
							break;
						}
						haveFilter = false;
					}
				}

				if(filters.mapTag > 0)
				{
					for(y in filters.mapTag)
					{
						if(this.elementDom.all[x].getAttribute(filters.mapTag[y]) == undefined)
						{
							haveFilter = false;
							brake;
						}
					}
				}

				if(haveFilter)
				{
					doms.push(this.elementDom.all[x]);
				}

			}
			return doms;

	},

	set:function(obj){
		if(obj instanceof Object)
		{
			if(obj.elements != undefined)
			{
				if(obj.elements instanceof Array)
				{
					this.congif.elements = obj.elements;
				}
				else if(obj.elements instanceof Object)
				{
					this.congif.elements = [];
					for(x in obj.elements)
					{
						if(typeof obj.elements[x] == "string")
						{
							this.congif.elements.push(obj.elements[x]);
						}
					}
				}
			}

			if(obj.mapTag != undefined)
			{
				if(obj.mapTag instanceof Array)
				{
					this.congif.mapTag = obj.mapTag;
				}
				else if(obj.mapTag instanceof Object)
				{
					this.congif.mapTag = [];
					for(x in obj.mapTag)
					{
						if(typeof obj.mapTag[x] == "string")
						{
							this.congif.mapTag.push(obj.mapTag[x]);
						}
					}
				}
			}

		}
		else if(typeof obj == "string")
		{
			this.congif.elements = [];
			this.congif.elements.push(obj);
		}
		return this;
	}// Fim funcao SET
};
