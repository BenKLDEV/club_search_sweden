const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Sök efter Sveriges klubbar och filtrera.
const searchClubs = async searchText => 
{
  // fetch req
  const res = await fetch('../data/klubbar.json');
  // promise response med json.
  const clubs = await res.json();


  // Få matchningar med det som skrivs in.
  let matches = clubs.filter(club => 
  { 
    // regular expression, ^ start with. gi lowercase or uppercase.
    const regex = new RegExp(`^${searchText}`, 'gi');
    return club.stad.match(regex) || club.adress.match(regex);
  });

  if (searchText.length === 0)
  {
    matches = [];
    matchList.innerHTML = '';
  }

  outputHtml(matches);
};

// Visa sökresultat i HTML.
const outputHtml = matches => 
{
  if (matches.length > 0)
  {
    // map returns an array from an array
    const html = matches.map(match => `
    <div class="card card-body mb-1">
    <h4> <span class="text-info"> ${match.namn} </span> (${match.stad})</h4>
    <small> Betyg: ${match.betyg}, <br> Adress: ${match.adress}</small> 
    </div>
    `).join('');

    matchList.innerHTML = html;

    

  }
}

search.addEventListener('input', () => searchClubs(search.value));