import doT from 'dot';

export function lemmata_query(params) {
  return doT.template(`
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <http://api.dasch.swiss:443/ontology/0807/mls/simple/v2#>
    CONSTRUCT {
        ?lemma knora-api:isMainResource true .
        ?lemma mls:hasLemmaText ?text .
        ?lemma mls:hasFamilyName ?fname .
        ?lemma mls:hasGivenName ?gname .
        ?lemma mls:hasStartDate ?startdate .
        ?lemma mls:hasEndDate ?enddate .
    } WHERE {
        ?lemma a knora-api:Resource .
        ?lemma a mls:Lemma .
        ?lemma mls:hasLemmaText ?text .
        ?lemma mls:hasFamilyName ?fname .
        ?lemma mls:hasGivenName ?gname .
        OPTIONAL { ?lemma mls:hasStartDate ?startdate . }
        OPTIONAL { ?lemma mls:hasEndDate ?enddate . }
        FILTER regex(?text, "^{{=it.start}}", "i")
    }
    ORDER BY ASC(?text)
    OFFSET {{=it.page}}
  `)(params);
}

export function lemmata_search(params) {
  return doT.template(`
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <http://api.dasch.swiss:443/ontology/0807/mls/simple/v2#>
    CONSTRUCT {
        ?lemma knora-api:isMainResource true .
        ?lemma mls:hasLemmaText ?text .
        ?lemma mls:hasFamilyName ?fname .
        ?lemma mls:hasGivenName ?gname .
        ?lemma mls:hasStartDate ?startdate .
        ?lemma mls:hasEndDate ?enddate .
   } WHERE {
        ?lemma a knora-api:Resource .
        ?lemma a mls:Lemma .
        ?lemma mls:hasLemmaText ?text .
        {
          ?lemma mls:hasPseudonym ?pseudo .
          FILTER regex(?pseudo, "{{=it.searchterm}}", "i") .
        } UNION {
            FILTER regex(?text, "{{=it.searchterm}}", "i") .
        } UNION {
          ?lemma mls:hasVariants ?variant .
          FILTER regex(?variant, "{{=it.searchterm}}", "i") .
        }
        OPTIONAL { ?lemma mls:hasStartDate ?startdate . }
        OPTIONAL { ?lemma mls:hasEndDate ?enddate . }
    }
    ORDER BY ASC(?text)
    OFFSET {{=it.page}}
  `)(params);
}

export function lexicons_query(params) {
  return doT.template(`
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <http://api.dasch.swiss:443/ontology/0807/mls/simple/v2#>
    CONSTRUCT {
        ?lemma knora-api:isMainResource true .
        ?lemma mls:hasCitationForm ?text .
        ?lemma mls:hasYear ?year .
    } WHERE {
        ?lemma a knora-api:Resource .
        ?lemma a mls:Lexicon .
        ?lemma mls:hasCitationForm ?text .
        ?lemma mls:hasYear ?year .
    }
    ORDER BY ASC(?text)
  `)(params);
}

export function lexlemma_query(params) {
  return doT.template(`
    PREFIX knora-api: <http://api.knora.org/ontology/knora-api/simple/v2#>
    PREFIX mls: <http://api.dasch.swiss:443/ontology/0807/mls/simple/v2#>
    CONSTRUCT {
        ?lexicon knora-api:isMainResource true .
        ?article mls:hasALinkToLemma ?lemma .
        ?lemma mls:hasLemmaText ?text .
        ?article mls:hasALinkToLexicon ?lexicon .
        ?article mls:hasArticleText ?arttext .
        ?lexicon mls:hasShortname ?shortname .
        ?lexicon mls:hasCitationForm ?citation .
    } WHERE {
        BIND(<{{=it.lemma_iri}}> AS ?lemma)
        ?article a knora-api:Resource .
        ?article a mls:Article .
        ?article mls:hasALinkToLemma ?lemma .
        ?lemma mls:hasLemmaText ?text .
        ?lexicon a knora-api:Resource .
        ?lexicon a mls:Lexicon .
        ?article mls:hasALinkToLexicon ?lexicon .
        OPTIONAL { ?article mls:hasArticleText ?arttext . }
        OPTIONAL { ?lexicon mls:hasShortname ?shortname . }
        OPTIONAL { ?lexicon mls:hasCitationForm ?citation . }
    }
  `)(params)
}