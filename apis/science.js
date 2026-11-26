(function (K) {
  'use strict';
  const enc = K.enc;
  const RESEARCH = 'research:3 paper:3 papers:3 study:2 studies:2 journal:3 doi:3 citation:3 citations:3 academic:3 scientific:2 article:2 articles:2 scholarly:3 science:2';

  K.category('science', 'Science & research', [
    {
      id: 'crossref', name: 'Crossref', home: 'https://www.crossref.org/',
      kw: `${RESEARCH} crossref:3`,
      sample: 'crossref machine learning paper',
      url: q => `https://api.crossref.org/works?rows=5&query=${enc(K.term(q))}`,
      list: 'message.items',
      title: x => (x.title && x.title[0]) || '(untitled)',
      body: x => [(x.author || []).slice(0, 2).map(a => a.family).filter(Boolean).join(', '), x.issued?.['date-parts']?.[0]?.[0]].filter(Boolean).join(' · '),
      link: 'URL',
    },
    {
      id: 'pubmed', name: 'PubMed (NCBI)', home: 'https://pubmed.ncbi.nlm.nih.gov/',
      kw: 'pubmed:3 medline:3 biomedical:3 medical_research:3 ncbi:2 clinical_study:2',
      sample: 'pubmed crispr',
      run: async q => {
        const s = await K.http(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=5&term=${enc(K.term(q))}`);
        const ids = s.esearchresult.idlist;
        K.need(ids.length, 'No PubMed articles matched.');
        const d = await K.http(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(',')}`);
        return ids.map(id => d.result[id]).filter(Boolean).map(r => ({
          title: r.title,
          body: [r.source, r.pubdate, (r.authors || []).slice(0, 2).map(a => a.name).join(', ')].filter(Boolean).join(' · '),
          link: `https://pubmed.ncbi.nlm.nih.gov/${r.uid}/`,
        }));
      },
    },
    {
      id: 'pubchem', name: 'PubChem', home: 'https://pubchem.ncbi.nlm.nih.gov/',
      kw: 'pubchem:3 chemical:3 chemicals:3 compound:3 compounds:3 molecule:3 molecular_formula:3 molecular_weight:2 chemistry:3 chemical_formula:3',
      sample: 'molecular formula of aspirin',
      url: q => `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${enc(K.term(q))}/property/MolecularFormula,MolecularWeight/JSON`,
      list: 'PropertyTable.Properties',
      title: (x, q) => K.cap(K.term(q)),
      body: x => `${x.MolecularFormula} · ${x.MolecularWeight} g/mol`,
      link: x => `https://pubchem.ncbi.nlm.nih.gov/compound/${x.CID}`,
    },
    {
      id: 'uniprot', name: 'UniProt', home: 'https://www.uniprot.org/',
      kw: 'uniprot:3 protein:3 proteins:3 enzyme:2 enzymes:2 proteome:2 amino_acid:2',
      sample: 'insulin protein',
      url: q => `https://rest.uniprot.org/uniprotkb/search?query=${enc(K.term(q))}&format=json&size=5`,
      list: 'results',
      title: x => x.proteinDescription?.recommendedName?.fullName?.value || x.uniProtkbId,
      body: x => `${x.primaryAccession} · ${x.organism?.scientificName || ''}`,
      link: x => `https://www.uniprot.org/uniprotkb/${x.primaryAccession}`,
    },
    {
      id: 'ensembl', name: 'Ensembl Genes', home: 'https://www.ensembl.org/',
      kw: 'gene:3 genes:3 genome:2 genomics:2 dna:2 ensembl:3 genetics:2',
      sample: 'BRCA2 gene',
      url: q => `https://rest.ensembl.org/lookup/symbol/homo_sapiens/${enc(K.term(q).toUpperCase())}?content-type=application/json`,
      list: d => [d],
      title: 'display_name',
      body: 'description',
      link: x => `https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${x.id}`,
    },
    {
      id: 'chembl', name: 'ChEMBL', home: 'https://www.ebi.ac.uk/chembl/',
      kw: 'chembl:3 bioactive:2 drug_discovery:3 drug_candidate:2 pharmacology:2',
      sample: 'chembl aspirin',
      url: q => `https://www.ebi.ac.uk/chembl/api/data/molecule/search.json?q=${enc(K.term(q))}&limit=5`,
      list: 'molecules',
      title: x => x.pref_name || x.molecule_chembl_id,
      body: x => `${x.molecule_type || 'molecule'} · ${x.molecule_chembl_id}`,
      link: x => `https://www.ebi.ac.uk/chembl/compound_report_card/${x.molecule_chembl_id}/`,
    },
    {
      id: 'ror', name: 'ROR Research Organizations', home: 'https://ror.org/',
      kw: 'university:3 universities:3 institution:2 institutions:2 research_institute:3 research_organization:3 lab:1',
      sample: 'university MIT',
      url: q => `https://api.ror.org/v2/organizations?query=${enc(K.term(q))}`,
      list: 'items',
      title: x => (x.names || []).find(n => (n.types || []).includes('ror_display'))?.value || x.id,
      body: x => x.locations?.[0]?.geonames_details?.country_name || '',
      link: 'id',
    },
    {
      id: 'inspire', name: 'INSPIRE-HEP', home: 'https://inspirehep.net/',
      kw: 'physics:2 particle:2 particles:2 higgs:3 high_energy:3 astrophysics:2 hep:3 inspire:3',
      sample: 'higgs boson papers',
      url: q => `https://inspirehep.net/api/literature?q=${enc(K.term(q))}&size=5`,
      list: 'hits.hits',
      title: x => x.metadata?.titles?.[0]?.title,
      body: x => `${x.metadata?.citation_count ?? 0} citations · ${(x.metadata?.authors || []).slice(0, 2).map(a => a.full_name).join(', ')}`,
      link: x => `https://inspirehep.net/literature/${x.id}`,
    },
    {
      id: 'zenodo', name: 'Zenodo', home: 'https://zenodo.org/',
      kw: 'zenodo:3 open_science:2 research_data:3 research_repository:2 dataset_archive:2',
      sample: 'zenodo climate',
      url: q => `https://zenodo.org/api/records?q=${enc(K.term(q))}&size=5`,
      list: 'hits.hits',
      title: x => x.metadata?.title,
      body: x => [(x.metadata?.creators || []).slice(0, 2).map(c => c.name).join(', '), x.metadata?.publication_date].filter(Boolean).join(' · '),
      link: x => x.links?.html,
    },
    {
      id: 'quickgo', name: 'QuickGO Gene Ontology', home: 'https://www.ebi.ac.uk/QuickGO/',
      kw: 'gene_ontology:3 ontology:3 go_term:3 go_terms:2 biological_process:3',
      sample: 'gene ontology apoptosis',
      url: q => `https://www.ebi.ac.uk/QuickGO/services/ontology/go/search?query=${enc(K.term(q))}&limit=5`,
      list: 'results',
      title: 'name',
      body: x => x.definition?.text,
      link: x => `https://www.ebi.ac.uk/QuickGO/term/${x.id}`,
    },
    {
      id: 'rcsb', name: 'RCSB Protein Data Bank', home: 'https://www.rcsb.org/',
      kw: 'pdb:3 protein_structure:3 protein_structures:3 crystal:2 rcsb:3 structural_biology:2 structure:1',
      sample: 'PDB 4HHB',
      url: q => `https://data.rcsb.org/rest/v1/core/entry/${((K.term(q).match(/[0-9][a-z0-9]{3}/i)) || ['1HHB'])[0].toUpperCase()}`,
      list: d => [d],
      title: x => x.struct?.title || x.rcsb_id,
      body: x => `${x.rcsb_entry_info?.polymer_entity_count ?? '?'} polymer entities · released ${(x.rcsb_accession_info?.initial_release_date || '').slice(0, 10)}`,
      link: x => `https://www.rcsb.org/structure/${x.rcsb_id}`,
    },
    {
      id: 'newton', name: 'Newton Math Solver', home: 'https://newton.vercel.app/',
      kw: 'math:3 derivative:3 derivatives:3 integral:3 integrate:3 simplify:3 algebra:3 calculus:3 factor:2 solve:2 equation:2',
      sample: 'derivative of x^2',
      run: async q => {
        const m = K.need(q.match(/(derivative|derive|integral|integrate|simplify|factor|zeroes|tangent|area|cos|sin|tan|abs|log)\s+(?:of\s+)?(.+)/i),
          'Try "derivative of x^2" or "simplify 2x+2x".');
        const op = { derivative: 'derive', integral: 'integrate' }[m[1].toLowerCase()] || m[1].toLowerCase();
        const d = await K.http(`https://newton.vercel.app/api/v2/${op}/${enc(m[2].trim())}`);
        return [{ title: `${d.operation}(${d.expression})`, body: d.result, link: 'https://newton.vercel.app/' }];
      },
    },
  ], {
    kw: 'science:2 research:2 scientific:1',
  });
  K.register('science', {
    id: 'wellcome', name: 'Wellcome Collection works', home: 'https://wellcomecollection.org/',
    kw: 'wellcome:3 medical_history:3 medical_archive:2 wellcome_collection:3 medical_library:2',
    sample: 'plague',
    url: q => `https://api.wellcomecollection.org/catalogue/v2/works?query=${enc(K.term(q))}&pageSize=5`,
    list: 'results',
    title: w => w.title,
    body: w => w.workType?.label || '',
    link: w => `https://wellcomecollection.org/works/${w.id}`,
  });
})(Keyless);
