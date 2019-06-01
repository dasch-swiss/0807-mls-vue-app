const lemmata_query = doT.template(`
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
`);