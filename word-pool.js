
const getWordPool = poems => {
  
  const TfIdf = natural.TfIdf
  const tfidf = new TfIdf()
  poems.forEach(poem => tfidf.addDocument(poem));
  const termScores = {};

  tfidf.documents.forEach((doc, index) => {
      const listTerms = tfidf.listTerms(index);
      listTerms.forEach(item => {
          const term = item.term;
          const score = item.tfidf;
          if (!termScores[term] || score > termScores[term]) {
              termScores[term] = score;
          }
      });
  });

  const sortedTerms = Object.keys(termScores).sort((a, b) => termScores[b] - termScores[a]);

  const wordPools = {
      nouns: [],
      verbs: [],
      adjectives: [],
      adverbs: [],
  };

  sortedTerms.forEach(term => {
      const posTag = RiTa.pos([term])[0];
      switch (posTag) {
          case 'nn': case 'nns':
              wordPools.nouns.push(term);
              break;
          case 'vb': case 'vbd': case 'vbg': case 'vbn': case 'vbp': case 'vbz':
              wordPools.verbs.push(term);
              break;
          case 'jj':
              wordPools.adjectives.push(term);
              break;
          case 'rb':
              wordPools.adverbs.push(term);
              break;
      }
  });

  return wordPools;

}