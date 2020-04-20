//ALIVING OF POP UP MENU

let menu = document.getElementById('nav_menu')
document.addEventListener('click', function(e){
	let c = e.target.getAttribute('class')
	let i = e.target.getAttribute('id')
	if (c === 'nav_menu_li'){return};
	if (i == 'menu'){
		menu.style.display = 'block';
		menu.style.opacity=0;
		menu.animate([{opacity:0},{opacity:1}],{duration:100,fill:'both'});setTimeout(()=>menu.style.display='block',100)}else{
			menu.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>menu.style.display='none',100)};
});

menu.addEventListener('click',function(){
	menu.animate([{opacity:1},{opacity:0}],{duration:100,fill:'both'});setTimeout(()=>menu.style.display='none',100)});

//PART LOGIC OF CALENDAR

let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

let now = new Date()
let current_month = months[now.getMonth()]
document.getElementById('month_name').innerHTML = current_month
document.getElementById('month_day').innerHTML = now.getDate()

let currentMonth = now.getMonth()
let currentYear = now.getFullYear()
let container_days = document.getElementById('nav_days_ul')
let element_month = document.getElementById('month_name')
let element_year = document.getElementById('year')

for (count in days){
	let newElem = document.createElement('th')
	newElem.innerHTML = days[count]
	newElem.id = days[count]
	newElem.className = 'day'
	newElem.style.cssText = 'text-decoration: none;display: block;float: left;padding: 145px 100px;text-decoration: none;font-size:30px;font-family: "Roboto", sans-serif;width: auto;'
	container_days.style.cssText = 'position:absolute;margin-top:10px;margin-left:-230px;'
	container_days.appendChild(newElem)
}

function generate_year_range(start, end) {
  var years = "";
  for (var year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

var createYear = generate_year_range(1970,2050)
showCalendar(currentMonth,currentYear)

function showCalendar(month,year){
	let firstDay = (new Date(year,month)).getDay()

	let tbl = document.getElementById('calendar_body')
	tbl.innerHTML = ''

	element_month.innerHTML=months[month];element_year.innerHTML=year

	//CREATING CELLS
	let date = 1
	for (var i=0;i<6;i++){
		let body = document.getElementById('body')
		let row = document.createElement('tr')
		body.appendChild(row)
		row.style.cssText = "font-size: 30px;font-family: 'Lato', sans-serif;"
		for (var j=0;j<7;j++){
			if (i===0 && j<firstDay){
				let cell = document.createElement('td')
				let cellText = document.createTextNode("")
				cell.appendChild(cellText)
				row.appendChild(cell)
			}else if (date>daysInMonth(month,year)){
				break;
			}else{
				let cell = document.createElement('td')
				cell.setAttribute("data-date",date)
				cell.setAttribute('data-month',month+1)
				cell.setAttribute('data-year', year)
				cell.setAttribute('data-month_name',months[month])
				cell.className='date-picker'
				cell_span = document.createElement('div')
				cell_span.innerHTML = date
				cell_span.setAttribute('id','span_'+date)
				cell_span.setAttribute('class','cell_div')
				cell.appendChild(cell_span)
				cell.style.cssText = 'padding:50px;padding-left:165px;text-align:center;'

				if (date === now.getDate() && year === now.getFullYear() && month === now.getMonth()){
					cell.className = 'date-picker selected'
					let bg_cell = document.createElement('span')
					cell_span.style.cssText = 'z-index:1;color:white;text-align:center;margin-top:30px;padding-right:5px;'
					cell.style.cssText = 'background-color:#E73A3C;width:100px;height:100px;position:absolute;border-radius:10px;margin-left:130px;z-index:2;margin-top:10px;'
					cell_span.appendChild(bg_cell)
				}
				row.appendChild(cell)
				date++
			}
		}
	tbl.appendChild(row)
	}
}
function daysInMonth(iMonth,iYear){
	return 32 - new Date(iYear, iMonth, 32).getDate()
}