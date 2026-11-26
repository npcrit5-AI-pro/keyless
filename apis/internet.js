(function (K) {
  'use strict';
  const enc = K.enc;

  K.category('internet', 'Internet & networking', [
    {
      id: 'ipify', name: 'ipify (my public IP)', home: 'https://www.ipify.org/',
      kw: 'my_ip:3 public_ip:3 ip_address:3 what_is_my_ip:3 ipify:3 external_ip:2',
      sample: 'my public ip',
      url: () => 'https://api.ipify.org?format=json',
      list: d => [d],
      title: d => `Your public IP: ${d.ip}`,
      body: () => 'Reported by ipify',
      link: 'https://www.ipify.org/',
    },
    {
      id: 'cloudflare-dns', name: 'Cloudflare DNS-over-HTTPS', home: 'https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/',
      kw: 'dns:3 dns_lookup:3 dns_record:3 domain_records:3 nameserver:2 mx_record:3 a_record:2 txt_record:2 cname:2',
      sample: 'dns for example.com',
      run: async q => {
        const name = (q.match(/([a-z0-9-]+\.)+[a-z]{2,}/i) || ['example.com'])[0];
        const d = await K.http(`https://cloudflare-dns.com/dns-query?name=${enc(name)}&type=A`, { headers: { accept: 'application/dns-json' } });
        K.need(d.Answer && d.Answer.length, `No A records for ${name}.`);
        return d.Answer.slice(0, 5).map(a => ({ title: `${name} → ${a.data}`, body: `TTL ${a.TTL}s · A record`, link: 'https://developers.cloudflare.com/1.1.1.1/' }));
      },
    },
    {
      id: 'google-dns', name: 'Google Public DNS', home: 'https://developers.google.com/speed/public-dns/docs/doh/json',
      kw: 'google_dns:3 dns_google:3 mx_lookup:2',
      sample: 'mx records for gmail.com',
      run: async q => {
        const name = (q.match(/([a-z0-9-]+\.)+[a-z]{2,}/i) || ['gmail.com'])[0];
        const d = await K.http(`https://dns.google/resolve?name=${enc(name)}&type=MX`);
        K.need(d.Answer && d.Answer.length, `No MX records for ${name}.`);
        return d.Answer.slice(0, 5).map(a => ({ title: `${name} MX`, body: a.data, link: 'https://dns.google/' }));
      },
    },
    {
      id: 'rdap', name: 'RDAP (domain registration)', home: 'https://about.rdap.org/',
      kw: 'whois:3 domain_owner:3 domain_registration:3 rdap:3 domain_registrar:2 domain_info:2',
      sample: 'whois example.com',
      run: async q => {
        const name = (q.match(/([a-z0-9-]+\.)+[a-z]{2,}/i) || ['example.com'])[0];
        const d = await K.http(`https://rdap.org/domain/${enc(name)}`);
        const reg = (d.events || []).find(e => e.eventAction === 'registration');
        return [{
          title: d.ldhName || name,
          body: `${d.status?.join(', ') || ''}${reg ? ' · registered ' + reg.eventDate.slice(0, 10) : ''}`,
          link: `https://rdap.org/domain/${name}`,
        }];
      },
    },
    {
      id: 'httpbin', name: 'httpbin', home: 'https://httpbin.org/',
      kw: 'httpbin:3 http_test:3 request_echo:3 headers_echo:3 test_request:2',
      sample: 'echo my headers',
      url: () => 'https://httpbin.org/get',
      list: d => [d],
      title: () => 'Your request, echoed',
      body: d => `origin ${d.origin} · ${Object.keys(d.headers).length} headers`,
      link: 'https://httpbin.org/',
    },
  ], {
    kw: 'internet:2 network:2 networking:2 web:1 domain:2 domains:2 ip:2',
  });
  K.register('internet', {
    id: 'commoncrawl', name: 'Common Crawl index', home: 'https://commoncrawl.org/',
    kw: 'common_crawl:3 web_archive:3 crawl_index:3 web_crawl:3 commoncrawl:3 web_data:2',
    sample: 'common crawl',
    url: () => 'https://index.commoncrawl.org/collinfo.json',
    list: d => d.slice(0, 5),
    title: c => c.name,
    body: c => c.timegate,
    link: c => c.timegate,
  });
  K.register('internet', {
    id: 'geolocation-db', name: 'geolocation-db.com (my IP)', home: 'https://geolocation-db.com/',
    kw: 'ip_geo:3 locate_ip:3 ip_city:2 ip_country:2 my_ip_location:3',
    sample: 'where am I',
    url: () => 'https://geolocation-db.com/json/',
    list: d => [d],
    title: d => `${d.IPv4} · ${d.city}, ${d.country_name}`,
    body: d => `${d.latitude}, ${d.longitude}`,
    link: () => 'https://geolocation-db.com/',
  });
})(Keyless);
