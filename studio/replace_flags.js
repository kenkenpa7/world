const fs = require('fs');
let content = fs.readFileSync('import_countries.js', 'utf8');
const map = {
  '🇹🇼': 'tw', '🇰🇷': 'kr', '🇹🇭': 'th', '🇻🇳': 'vn', '🇵🇭': 'ph',
  '🇨🇳': 'cn', '🇫🇷': 'fr', '🇬🇧': 'gb', '🇮🇹': 'it', '🇺🇸': 'us',
  '🌺': 'us-hi', '🇦🇺': 'au', '🇸🇬': 'sg', '🇮🇩': 'id', '🇲🇾': 'my'
};
for (const [emoji, code] of Object.entries(map)) {
  content = content.replace(new RegExp("flag:\\s*'" + emoji + "'", 'g'), "countryCode: '" + code + "'");
}
fs.writeFileSync('import_countries.js', content);
console.log('Done!');
