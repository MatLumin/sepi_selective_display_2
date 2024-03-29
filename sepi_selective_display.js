//general funcrtions======
let log = console.log;
function return_array_version_of_iterable(iterable)
	{
	let output = [];
	for (let item of iterable)
		{
		output.push(item);
		}
	return output;		
	}



//classes 


class SSD__Data
	{
	constructor(flag, node_ref, parent)
		{
		this.flag = flag;
		this.node_ref = node_ref;
		this.is_hidden = false;
		this.parent = parent;
		}

	remove_from_parent()
		{
		this.parent.removeChild(this.node_ref);
		}

	add_to_parent()
		{
		this.parent.appendChild(this.node_ref);
		}

	hide()
		{
		if (this.is_hidden == true)
			{
			return;
			}
		this.remove_from_parent();
		this.is_hidden = true;
		}

	show()
		{
		if (this.is_hidden == false)
			{
			return ;
			}
		this.add_to_parent();
		this.is_hidden = false;
		}
	}






class SepiSelectiveDisplay
	{
	constructor(flags) 
		{
		this.flags = flags;
		this.data = []; //will be filled by SSD__Data
		this.collect_data();
		this.do_debug_report();		
		}

	collect_data()
		{
		for (let flag of this.flags)
			{
			let flag_holders = document.querySelectorAll(`[${flag}]`);
			for (let flag_holder of flag_holders)
				{
				let data_instance = new SSD__Data(flag, flag_holder, flag_holder.parentElement);
				this.data.push(data_instance);
				}
			}
		}


	do_debug_report()
		{
		let log = console.log;
		log("SepiSelectiveDisplay DEBUG REPORT");
		log(`flags:`);
		log(this.flags);
		log('data:');
		log(this.data);
		}


	hide_flag(flag)
		{
		for (let data_instance of this.data)
			{
			let is_shown = data_instance.is_hidden == false;
			let is_holding_wanted_flag = data_instance.flag == flag;
			if (is_shown && is_holding_wanted_flag)
				{
				data_instance.hide();
				}
			}
		}

	show_flag(flag)
		{
		for (let data_instance of this.data)
			{
			let is_hidden = data_instance.is_hidden == true;
			let is_holding_wanted_flag = data_instance.flag == flag;
			if (is_hidden && is_holding_wanted_flag)
				{
				data_instance.show();
				}
			}
		}


	hide_all_flags()
		{
		for (let flag of this.flags) 
			{
			this.hide_flag(flag);
			}		
		}


	show_this_flag_and_hide_others(flag)
		{
		this.hide_all_flags();
		this.show_flag(flag)
		}

	

	}