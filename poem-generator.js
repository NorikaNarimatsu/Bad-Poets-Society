const chooseArticle = word => {
    return (['a', 'e', 'i', 'o', 'u'].includes(word.charAt(0).toLowerCase())) ? 'an' : 'a';
};

const buildGrammarWithPool = wordPools => {
    const adj1 = wordPools.adjectives.filter(word => RiTa.stresses(word) === '1');
    const adj1_with_article = adj1.map(word => `${chooseArticle(word)} ${word}`);
  

    const adj3 = wordPools.adjectives.filter(word => RiTa.stresses(word) === '1'); 
    const adj3_with_article = adj3.map(word => `${chooseArticle(word)} ${word}`);

    return {
        "start": "$line1\n$line2\n$line3\n$line4\n$line5\n$line6",
        
        "line1": "We, this $noun1_1, on $adj1_with_article $noun2_1",
        "line2": "Traveling through $adj3_with_article $noun3_1,",
        "line3": "With each $adj2_1 $noun4_1 that we face",
        "line4": "$adverb1, we $verb1 in this space",
        "line5": "For the $noun5_1 and $noun6_1 do say,",
        "line6": "$verb2, and find your way.",

        "noun1_1": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "adj1_with_article": adj1_with_article,
        "adj3_with_article": adj3_with_article,
        
        "noun2_1": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "noun3_1": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "adj2_1": wordPools.adjectives.filter(word => RiTa.stresses(word) === '1'),
        "noun4_1": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "adverb1": wordPools.adverbs.filter(word => RiTa.stresses(word) === '1'),
        "verb1": wordPools.verbs.filter(word => RiTa.stresses(word) === '1'),
        "noun5_1": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "noun6_1": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "verb2": wordPools.verbs.filter(word => RiTa.stresses(word) === '1')
    };
}

const buildGrammarWithPool2 = wordPools => {
    const adj1_with_article = wordPools.adjectives.filter(word => RiTa.stresses(word) === '1').map(word => `${chooseArticle(word)} ${word}`);
    const adj2_with_article = adj1_with_article;

    return {
        "start": "$line1\n$line2\n$line3\n$line4",

        "line1": "A $adj1 $noun1 $verb1",
        "line2": "on $adj1_with_article $noun2",
        "line3": "and $verb2 downstream",
        "line4": "till the $noun3 ends",

        "noun1": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "noun2": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),
        "noun3": wordPools.nouns.filter(word => RiTa.stresses(word) === '1'),

        "adj1": wordPools.adjectives.filter(word => RiTa.stresses(word) === '1'),
        "adj1_with_article": adj1_with_article,
        "adj2_with_article": adj2_with_article,

        "verb1": wordPools.verbs.filter(word => RiTa.stresses(word) === '1'),
        "verb2": wordPools.verbs.filter(word => RiTa.stresses(word) === '1')
    };
}


const generatePoemByTemplate = (template, wordPools) => {
  const grammar = RiTa.grammar(template);
  return grammar.expand();
}
const generatePoem = (poems) => {
  const poemsContent = poems.map(a => a.content)
  const wordPools = getWordPool(poemsContent);
  
  const p1 = generatePoemByTemplate(buildGrammarWithPool(wordPools))
  const p2 = generatePoemByTemplate(buildGrammarWithPool2(wordPools))

  return [p1, p2];
}