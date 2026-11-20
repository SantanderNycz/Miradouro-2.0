/* Relatório de exemplo (semente para novos relatórios). */
import type { Report } from "@/types/report";

export const defaultReport: Report = {
  "meta": {
    "theme": "P",
    "period": "6–31 Ago 2026",
    "brand": "Laskasas Portugal · Relatório de campanha",
    "title": "Dias Quentes — Agosto 2026",
    "intro": "Análise de resultados da campanha de verão. Este ano a campanha de saldos foi feita em maio e junho e voltou a acontecer em agosto, como nos anos anteriores. Maio e junho tiveram condicionantes próprias, que se assinalam adiante. Este relatório analisa a campanha de agosto no seu contexto.",
    "footer": "Laskasas Portugal · Campanha Dias Quentes · 6 a 31 de agosto de 2026",
    "readingNotes": "**Notas de leitura.** Vendas, objetivos e investimento são valores oficiais (ficheiro de vendas). Os dados de clientes novos, recorrentes, ticket médio e faixas de valor vêm do Artsoft, o CRM atual, que tem falhas conhecidas; são aproximados e não coincidem com os valores oficiais. O ticket médio é, por cliente, a soma das suas compras a dividir pelo número de compras. As vendas incluem lojas físicas e online, não sendo atribuíveis a plataformas de anúncios, pelo que os rácios são indicadores de negócio e não de atribuição. As entradas em loja usam o sistema de contagem atual, ativo desde novembro de 2025; períodos anteriores usaram um sistema com erros de contagem conhecidos e não são diretamente comparáveis."
  },
  "tabs": [
    {
      "label": "Veredicto",
      "blocks": [
        {
          "type": "kpis",
          "items": [
            {
              "eyebrow": "Objetivo atingido",
              "value": "108%",
              "sub": "1,94 M€ vendidos, sobre 1,80 M€ de objetivo",
              "accent": "sage",
              "hero": true,
              "delta": "+8 p.p.",
              "deltaDir": "up",
              "footnote": null
            },
            {
              "eyebrow": "Saldos de Mai/Jun",
              "value": "74% e 84%",
              "sub": "Ficaram abaixo do objetivo; tiveram condicionantes próprias",
              "accent": "terracotta",
              "dot": "terracotta",
              "delta": "−21%",
              "deltaDir": "down",
              "footnote": null
            },
            {
              "eyebrow": "Valor por visita ao site",
              "value": "10,66 €",
              "sub": "O mais alto desde que há tráfego comparável (2024+)",
              "accent": "navyLight",
              "dot": "navyLight",
              "delta": "+22%",
              "deltaDir": "up",
              "spark": [
                9.29,
                8.73,
                8.28,
                5.71,
                10.66
              ],
              "footnote": null
            },
            {
              "eyebrow": "Clientes novos",
              "value": "290",
              "sub": "Forte mês de aquisição, acima de Mai (213) e Jun (147)",
              "accent": "sage",
              "dot": "sage",
              "spark": [
                338,
                270,
                300,
                213,
                147,
                290
              ],
              "footnote": "fonte: Artsoft (aprox.)"
            }
          ]
        },
        {
          "type": "card",
          "eyebrow": "Visão geral",
          "title": "Evolução de vendas por campanha",
          "subtitle": "Vendas de cada campanha de verão ao longo do tempo. A linha marca o objetivo de agosto.",
          "blocks": [
            {
              "type": "areaChart",
              "data": [
                {
                  "lb": "Ago/22",
                  "camp": "Dias Quentes",
                  "disc": "−25%",
                  "inv": 22539,
                  "obj": 1295954,
                  "vnd": 1618133,
                  "ating": 124.9,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −25%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/23",
                  "camp": "Dias Quentes",
                  "disc": "−30%",
                  "inv": 28575,
                  "obj": 1620686,
                  "vnd": 1534191,
                  "ating": 94.7,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −30%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/24",
                  "camp": "Dias Quentes",
                  "disc": "−35%",
                  "inv": 35181,
                  "obj": 1766555,
                  "vnd": 1806074,
                  "ating": 102.2,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −35%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/25",
                  "camp": "Saldos Verão",
                  "disc": "−35%",
                  "inv": 36975,
                  "obj": 2184654,
                  "vnd": 2253295,
                  "ating": 103.1,
                  "exp": false,
                  "hero": false,
                  "sub": "Saldos Verão −35%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Mai/26",
                  "camp": "Saldos",
                  "disc": "−35%",
                  "inv": 40639,
                  "obj": 2316000,
                  "vnd": 1721803,
                  "ating": 74.3,
                  "exp": true,
                  "hero": false,
                  "sub": "Saldos −35%",
                  "color": "terracotta",
                  "_tone": "exp"
                },
                {
                  "lb": "Jun/26",
                  "camp": "Saldos",
                  "disc": "−40%",
                  "inv": 31042,
                  "obj": 1608939,
                  "vnd": 1343361,
                  "ating": 83.5,
                  "exp": true,
                  "hero": false,
                  "sub": "Saldos −40%",
                  "color": "terracotta",
                  "_tone": "exp"
                },
                {
                  "lb": "Ago/26",
                  "camp": "Dias Quentes",
                  "disc": "−45%",
                  "inv": 45907,
                  "obj": 1800000,
                  "vnd": 1943983,
                  "ating": 108,
                  "exp": false,
                  "hero": true,
                  "sub": "Dias Quentes −45%",
                  "color": "sage",
                  "_tone": "hero"
                }
              ],
              "xKey": "lb",
              "height": 300,
              "yFormat": "eurM",
              "series": [
                {
                  "key": "vnd",
                  "name": "Vendas",
                  "color": "navyLight"
                }
              ],
              "referenceLine": {
                "y": 1800000,
                "label": "objetivo Ago"
              },
              "tooltip": {
                "valueFormat": "eur",
                "extraKey": "sub"
              }
            }
          ]
        },
        {
          "type": "synthesis",
          "title": "Síntese",
          "items": [
            {
              "lead": "Agosto cumpriu o objetivo.",
              "text": "Atingiu 108% da meta (1,94 M€ sobre 1,80 M€), o segundo melhor cumprimento da série, alinhado com os agostos de 2024 e 2025."
            },
            {
              "lead": "Maio e junho ficaram abaixo.",
              "text": "74% e 84% do objetivo. Junho teve uma comunicação mais afastada da essência da marca, por exigência superior; maio foi idealizado pela equipa."
            },
            {
              "lead": "Comunicação própria da marca.",
              "text": "Agosto foi comunicado com a linguagem habitual da Laskasas, ao contrário de junho, e com desconto até 45%."
            },
            {
              "lead": "Mais valor por visita ao site, menos por visita à loja.",
              "text": "Agosto vendeu mais com menos tráfego online, mas a conversão em loja foi inferior à de maio e junho."
            }
          ]
        }
      ]
    },
    {
      "label": "Resultado comercial",
      "blocks": [
        {
          "type": "card",
          "eyebrow": "Contexto completo",
          "title": "A campanha face a todas as campanhas de verão",
          "subtitle": "Alterna entre o cumprimento do objetivo e o valor de vendas.",
          "blocks": [
            {
              "type": "barChart",
              "data": [
                {
                  "lb": "Ago/22",
                  "camp": "Dias Quentes",
                  "disc": "−25%",
                  "inv": 22539,
                  "obj": 1295954,
                  "vnd": 1618133,
                  "ating": 124.9,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −25%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/23",
                  "camp": "Dias Quentes",
                  "disc": "−30%",
                  "inv": 28575,
                  "obj": 1620686,
                  "vnd": 1534191,
                  "ating": 94.7,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −30%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/24",
                  "camp": "Dias Quentes",
                  "disc": "−35%",
                  "inv": 35181,
                  "obj": 1766555,
                  "vnd": 1806074,
                  "ating": 102.2,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −35%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/25",
                  "camp": "Saldos Verão",
                  "disc": "−35%",
                  "inv": 36975,
                  "obj": 2184654,
                  "vnd": 2253295,
                  "ating": 103.1,
                  "exp": false,
                  "hero": false,
                  "sub": "Saldos Verão −35%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Mai/26",
                  "camp": "Saldos",
                  "disc": "−35%",
                  "inv": 40639,
                  "obj": 2316000,
                  "vnd": 1721803,
                  "ating": 74.3,
                  "exp": true,
                  "hero": false,
                  "sub": "Saldos −35%",
                  "color": "terracotta",
                  "_tone": "exp"
                },
                {
                  "lb": "Jun/26",
                  "camp": "Saldos",
                  "disc": "−40%",
                  "inv": 31042,
                  "obj": 1608939,
                  "vnd": 1343361,
                  "ating": 83.5,
                  "exp": true,
                  "hero": false,
                  "sub": "Saldos −40%",
                  "color": "terracotta",
                  "_tone": "exp"
                },
                {
                  "lb": "Ago/26",
                  "camp": "Dias Quentes",
                  "disc": "−45%",
                  "inv": 45907,
                  "obj": 1800000,
                  "vnd": 1943983,
                  "ating": 108,
                  "exp": false,
                  "hero": true,
                  "sub": "Dias Quentes −45%",
                  "color": "sage",
                  "_tone": "hero"
                }
              ],
              "xKey": "lb",
              "height": 340,
              "yWidth": 52,
              "tooltip": {
                "extraKey": "sub"
              },
              "legendItems": [
                {
                  "color": "sage",
                  "label": "Campanha em destaque"
                },
                {
                  "color": "terracotta",
                  "label": "Abaixo do objetivo"
                },
                {
                  "color": "slate",
                  "label": "Restantes campanhas"
                }
              ],
              "variants": [
                {
                  "label": "Objetivo atingido",
                  "series": [
                    {
                      "key": "ating",
                      "colorKey": "color"
                    }
                  ],
                  "yFormat": "percent",
                  "yDomain": [
                    0,
                    135
                  ],
                  "referenceLine": {
                    "y": 100
                  },
                  "tooltip": {
                    "valueFormat": "percent",
                    "extraKey": "sub"
                  }
                },
                {
                  "label": "Vendas (€)",
                  "series": [
                    {
                      "key": "vnd",
                      "colorKey": "color"
                    }
                  ],
                  "yFormat": "eurM",
                  "tooltip": {
                    "valueFormat": "eur",
                    "extraKey": "sub"
                  }
                }
              ]
            },
            {
              "type": "note",
              "tone": "good",
              "text": "**Agosto de 2026 (108%) foi o segundo melhor cumprimento de objetivo da série, atrás apenas de agosto de 2022 (124,9%), que teve um objetivo bastante mais baixo.** As duas campanhas abaixo dos 95% são maio e junho de 2026. Em valor absoluto, agosto de 2025 vendeu mais (2,25 M€ contra 1,94 M€), com um objetivo também mais alto. Cada mês foi medido por uma fasquia diferente."
            }
          ]
        },
        {
          "type": "card",
          "eyebrow": "Detalhe",
          "title": "Quadro das campanhas de verão",
          "subtitle": "Valores oficiais de vendas e investimento em paid media. A profundidade do desconto subiu ano após ano, de 25% em 2022 até 45% em 2026.",
          "blocks": [
            {
              "type": "table",
              "rowToneKey": "_tone",
              "columns": [
                {
                  "key": "lb",
                  "label": "Mês",
                  "align": "left",
                  "bold": true,
                  "tone": "navy"
                },
                {
                  "key": "camp",
                  "label": "Campanha",
                  "align": "left"
                },
                {
                  "key": "disc",
                  "label": "Desconto",
                  "align": "left",
                  "muted": true
                },
                {
                  "key": "inv",
                  "label": "Investimento",
                  "align": "right",
                  "format": "eur"
                },
                {
                  "key": "obj",
                  "label": "Objetivo",
                  "align": "right",
                  "format": "eur",
                  "muted": true
                },
                {
                  "key": "vnd",
                  "label": "Vendas",
                  "align": "right",
                  "format": "eur"
                },
                {
                  "key": "ating",
                  "label": "Atingido",
                  "align": "right",
                  "format": "percent",
                  "bold": true,
                  "tone": "atingido"
                }
              ],
              "rows": [
                {
                  "lb": "Ago/22",
                  "camp": "Dias Quentes",
                  "disc": "−25%",
                  "inv": 22539,
                  "obj": 1295954,
                  "vnd": 1618133,
                  "ating": 124.9,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −25%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/23",
                  "camp": "Dias Quentes",
                  "disc": "−30%",
                  "inv": 28575,
                  "obj": 1620686,
                  "vnd": 1534191,
                  "ating": 94.7,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −30%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/24",
                  "camp": "Dias Quentes",
                  "disc": "−35%",
                  "inv": 35181,
                  "obj": 1766555,
                  "vnd": 1806074,
                  "ating": 102.2,
                  "exp": false,
                  "hero": false,
                  "sub": "Dias Quentes −35%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Ago/25",
                  "camp": "Saldos Verão",
                  "disc": "−35%",
                  "inv": 36975,
                  "obj": 2184654,
                  "vnd": 2253295,
                  "ating": 103.1,
                  "exp": false,
                  "hero": false,
                  "sub": "Saldos Verão −35%",
                  "color": "slate",
                  "_tone": null
                },
                {
                  "lb": "Mai/26",
                  "camp": "Saldos",
                  "disc": "−35%",
                  "inv": 40639,
                  "obj": 2316000,
                  "vnd": 1721803,
                  "ating": 74.3,
                  "exp": true,
                  "hero": false,
                  "sub": "Saldos −35%",
                  "color": "terracotta",
                  "_tone": "exp"
                },
                {
                  "lb": "Jun/26",
                  "camp": "Saldos",
                  "disc": "−40%",
                  "inv": 31042,
                  "obj": 1608939,
                  "vnd": 1343361,
                  "ating": 83.5,
                  "exp": true,
                  "hero": false,
                  "sub": "Saldos −40%",
                  "color": "terracotta",
                  "_tone": "exp"
                },
                {
                  "lb": "Ago/26",
                  "camp": "Dias Quentes",
                  "disc": "−45%",
                  "inv": 45907,
                  "obj": 1800000,
                  "vnd": 1943983,
                  "ating": 108,
                  "exp": false,
                  "hero": true,
                  "sub": "Dias Quentes −45%",
                  "color": "sage",
                  "_tone": "hero"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "label": "Funil e eficiência",
      "blocks": [
        {
          "type": "card",
          "eyebrow": "Campanha em análise",
          "title": "Do investimento à venda",
          "subtitle": "As quatro etapas da campanha, do euro investido à venda gerada.",
          "blocks": [
            {
              "type": "funnel",
              "steps": [
                {
                  "label": "Investimento",
                  "value": "45.907 €",
                  "sub": "abaixo do teto planeado de ~50.000 €",
                  "color": "navy"
                },
                {
                  "label": "Visitas ao site",
                  "value": "182.343",
                  "sub": "sessões no mês",
                  "color": "navyLight"
                },
                {
                  "label": "Visitas às lojas",
                  "value": "8.587",
                  "sub": "entradas registadas",
                  "color": "goldLight"
                },
                {
                  "label": "Vendas",
                  "value": "1,94 M€",
                  "sub": "108% do objetivo",
                  "color": "sage"
                }
              ]
            }
          ]
        },
        {
          "type": "callout",
          "title": "Um fator que ajuda a explicar o resultado",
          "text": "Agosto foi a primeira promoção agressiva depois de um mês inteiro a preço cheio. Julho de 2026 não teve campanha, ao contrário do que antecedeu maio ou junho. Foi o pior julho da série em vendas, mas deixou a procura intacta para agosto: quando não se satura o cliente no mês anterior, a campanha seguinte encontra o terreno preparado."
        },
        {
          "type": "card",
          "eyebrow": "Eficiência online",
          "title": "O que pagámos e o que rendeu cada visita ao site",
          "subtitle": "À esquerda, o custo por visita; à direita, o valor gerado por visita.",
          "blocks": [
            {
              "type": "row",
              "blocks": [
                {
                  "type": "barChart",
                  "subtitle": "Custo por visita ao site",
                  "data": [
                    {
                      "lb": "Ago/24",
                      "custo": 0.181,
                      "vsess": 9.29,
                      "sess": 194330,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "sessLabel": "194 330 visitas"
                    },
                    {
                      "lb": "Ago/25",
                      "custo": 0.143,
                      "vsess": 8.73,
                      "sess": 258202,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "sessLabel": "258 202 visitas"
                    },
                    {
                      "lb": "Mai/26",
                      "custo": 0.195,
                      "vsess": 8.28,
                      "sess": 207910,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "sessLabel": "207 910 visitas"
                    },
                    {
                      "lb": "Jun/26",
                      "custo": 0.132,
                      "vsess": 5.71,
                      "sess": 235347,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "sessLabel": "235 347 visitas"
                    },
                    {
                      "lb": "Ago/26",
                      "custo": 0.252,
                      "vsess": 10.66,
                      "sess": 182343,
                      "exp": false,
                      "hero": true,
                      "color": "sage",
                      "sessLabel": "182 343 visitas"
                    }
                  ],
                  "xKey": "lb",
                  "height": 250,
                  "yFormat": "eur2",
                  "barLabelFormat": "eur2",
                  "series": [
                    {
                      "key": "custo",
                      "colorKey": "color"
                    }
                  ],
                  "tooltip": {
                    "valueFormat": "eur3"
                  }
                },
                {
                  "type": "barChart",
                  "subtitle": "Vendas por visita ao site",
                  "data": [
                    {
                      "lb": "Ago/24",
                      "custo": 0.181,
                      "vsess": 9.29,
                      "sess": 194330,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "sessLabel": "194 330 visitas"
                    },
                    {
                      "lb": "Ago/25",
                      "custo": 0.143,
                      "vsess": 8.73,
                      "sess": 258202,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "sessLabel": "258 202 visitas"
                    },
                    {
                      "lb": "Mai/26",
                      "custo": 0.195,
                      "vsess": 8.28,
                      "sess": 207910,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "sessLabel": "207 910 visitas"
                    },
                    {
                      "lb": "Jun/26",
                      "custo": 0.132,
                      "vsess": 5.71,
                      "sess": 235347,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "sessLabel": "235 347 visitas"
                    },
                    {
                      "lb": "Ago/26",
                      "custo": 0.252,
                      "vsess": 10.66,
                      "sess": 182343,
                      "exp": false,
                      "hero": true,
                      "color": "sage",
                      "sessLabel": "182 343 visitas"
                    }
                  ],
                  "xKey": "lb",
                  "height": 250,
                  "yFormat": "eurPlain",
                  "barLabelFormat": "eurPlain",
                  "series": [
                    {
                      "key": "vsess",
                      "colorKey": "color"
                    }
                  ],
                  "tooltip": {
                    "valueFormat": "eurPlain",
                    "extraKey": "sessLabel"
                  }
                }
              ]
            },
            {
              "type": "note",
              "tone": "good",
              "text": "**Mais caro à entrada, melhor à saída.** Agosto foi o mês em que cada visita ao site custou mais (0,25 €), por ter investido mais e recebido menos tráfego. Mas cada visita rendeu 10,66 €, o valor mais alto desde que há tráfego comparável."
            }
          ]
        },
        {
          "type": "card",
          "eyebrow": "Eficiência em loja",
          "title": "O que pagámos e o que rendeu cada visita à loja",
          "subtitle": "As barras a cinzento usaram um sistema antigo com erros de contagem e não são comparáveis.",
          "blocks": [
            {
              "type": "row",
              "blocks": [
                {
                  "type": "barChart",
                  "subtitle": "Custo por visita à loja",
                  "data": [
                    {
                      "lb": "Ago/24",
                      "custo": 8.06,
                      "vent": 414,
                      "ent": 4367,
                      "fiavel": false,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "fiavelLabel": "sistema antigo",
                      "entLabel": "4367 entradas · sistema antigo"
                    },
                    {
                      "lb": "Ago/25",
                      "custo": 10.32,
                      "vent": 629,
                      "ent": 3582,
                      "fiavel": false,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "fiavelLabel": "sistema antigo",
                      "entLabel": "3582 entradas · sistema antigo"
                    },
                    {
                      "lb": "Mai/26",
                      "custo": 6.6,
                      "vent": 279,
                      "ent": 6161,
                      "fiavel": true,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "fiavelLabel": "sistema fiável",
                      "entLabel": "6161 entradas · fiável"
                    },
                    {
                      "lb": "Jun/26",
                      "custo": 6.4,
                      "vent": 277,
                      "ent": 4847,
                      "fiavel": true,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "fiavelLabel": "sistema fiável",
                      "entLabel": "4847 entradas · fiável"
                    },
                    {
                      "lb": "Ago/26",
                      "custo": 5.35,
                      "vent": 226,
                      "ent": 8587,
                      "fiavel": true,
                      "exp": false,
                      "hero": true,
                      "color": "sage",
                      "fiavelLabel": "sistema fiável",
                      "entLabel": "8587 entradas · fiável"
                    }
                  ],
                  "xKey": "lb",
                  "height": 250,
                  "yFormat": "eurPlain",
                  "barLabelFormat": "eur1",
                  "series": [
                    {
                      "key": "custo",
                      "colorKey": "color"
                    }
                  ],
                  "tooltip": {
                    "valueFormat": "eur2",
                    "extraKey": "fiavelLabel"
                  }
                },
                {
                  "type": "barChart",
                  "subtitle": "Vendas por visita à loja",
                  "data": [
                    {
                      "lb": "Ago/24",
                      "custo": 8.06,
                      "vent": 414,
                      "ent": 4367,
                      "fiavel": false,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "fiavelLabel": "sistema antigo",
                      "entLabel": "4367 entradas · sistema antigo"
                    },
                    {
                      "lb": "Ago/25",
                      "custo": 10.32,
                      "vent": 629,
                      "ent": 3582,
                      "fiavel": false,
                      "exp": false,
                      "hero": false,
                      "color": "slate",
                      "fiavelLabel": "sistema antigo",
                      "entLabel": "3582 entradas · sistema antigo"
                    },
                    {
                      "lb": "Mai/26",
                      "custo": 6.6,
                      "vent": 279,
                      "ent": 6161,
                      "fiavel": true,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "fiavelLabel": "sistema fiável",
                      "entLabel": "6161 entradas · fiável"
                    },
                    {
                      "lb": "Jun/26",
                      "custo": 6.4,
                      "vent": 277,
                      "ent": 4847,
                      "fiavel": true,
                      "exp": true,
                      "hero": false,
                      "color": "terracotta",
                      "fiavelLabel": "sistema fiável",
                      "entLabel": "4847 entradas · fiável"
                    },
                    {
                      "lb": "Ago/26",
                      "custo": 5.35,
                      "vent": 226,
                      "ent": 8587,
                      "fiavel": true,
                      "exp": false,
                      "hero": true,
                      "color": "sage",
                      "fiavelLabel": "sistema fiável",
                      "entLabel": "8587 entradas · fiável"
                    }
                  ],
                  "xKey": "lb",
                  "height": 250,
                  "yFormat": "eurPlain",
                  "barLabelFormat": "eurPlain",
                  "series": [
                    {
                      "key": "vent",
                      "colorKey": "color"
                    }
                  ],
                  "tooltip": {
                    "valueFormat": "eurPlain",
                    "extraKey": "entLabel"
                  }
                }
              ]
            },
            {
              "type": "note",
              "tone": "warn",
              "text": "**Encheu as lojas, mas a loja não converteu tão bem.** Agosto trouxe visitantes à loja ao custo mais baixo (5,35 € por entrada) e em muito maior número (8.587). Mas cada visita rendeu apenas 226 €, abaixo dos 279 € de maio e 277 € de junho. É o ponto do mês com mais margem para melhorar."
            }
          ]
        },
        {
          "type": "card",
          "eyebrow": "Onde foi investido",
          "title": "Repartição por meio",
          "blocks": [
            {
              "type": "progress",
              "items": [
                {
                  "label": "Facebook e Instagram",
                  "valueLabel": "32 518 € · 71%",
                  "pct": 71,
                  "color": "navy"
                },
                {
                  "label": "Google",
                  "valueLabel": "12 010 € · 26%",
                  "pct": 26,
                  "color": "navyLight"
                },
                {
                  "label": "Rede de websites",
                  "valueLabel": "1379 € · 3%",
                  "pct": 3,
                  "color": "slate"
                }
              ]
            },
            {
              "type": "note",
              "text": "O grosso do investimento foi para Facebook e Instagram, seguido do Google. A rede de websites teve um papel de reforço de exposição no arranque."
            }
          ]
        }
      ]
    },
    {
      "label": "Quem comprou",
      "blocks": [
        {
          "type": "banner",
          "tone": "gold",
          "text": "**Nota sobre a fonte.** Os dados desta secção vêm do Artsoft, o CRM atual, que tem falhas conhecidas. Os totais não coincidem com o ficheiro oficial de vendas, pelo que servem para ler tendências e composição, não valores absolutos."
        },
        {
          "type": "card",
          "eyebrow": "Aquisição vs retenção",
          "title": "Clientes novos e recorrentes por campanha",
          "subtitle": "Alterna entre número de clientes e valor gerado por cada grupo.",
          "blocks": [
            {
              "type": "barChart",
              "data": [
                {
                  "lb": "Ago/23",
                  "novos": 338,
                  "recor": 66,
                  "ticket": 2531,
                  "vNovos": 996312,
                  "vRecor": 248983,
                  "alto": 47.2,
                  "medio": 34.9,
                  "baixo": 15.8,
                  "ab900": 2.1
                },
                {
                  "lb": "Ago/24",
                  "novos": 270,
                  "recor": 148,
                  "ticket": 2733,
                  "vNovos": 840382,
                  "vRecor": 509213,
                  "alto": 51.7,
                  "medio": 32.7,
                  "baixo": 13.9,
                  "ab900": 1.7
                },
                {
                  "lb": "Ago/25",
                  "novos": 300,
                  "recor": 204,
                  "ticket": 2323,
                  "vNovos": 968194,
                  "vRecor": 464630,
                  "alto": 44.6,
                  "medio": 39.9,
                  "baixo": 14.4,
                  "ab900": 1.2
                },
                {
                  "lb": "Mai/26",
                  "novos": 213,
                  "recor": 173,
                  "ticket": 2661,
                  "vNovos": 707985,
                  "vRecor": 546974,
                  "alto": 58.6,
                  "medio": 28.2,
                  "baixo": 11.5,
                  "ab900": 1.7
                },
                {
                  "lb": "Jun/26",
                  "novos": 147,
                  "recor": 156,
                  "ticket": 2932,
                  "vNovos": 549648,
                  "vRecor": 477501,
                  "alto": 61.7,
                  "medio": 25.2,
                  "baixo": 11.8,
                  "ab900": 1.3
                },
                {
                  "lb": "Ago/26",
                  "novos": 290,
                  "recor": 220,
                  "ticket": 2703,
                  "vNovos": 973579,
                  "vRecor": 712775,
                  "alto": 53.5,
                  "medio": 31,
                  "baixo": 14.1,
                  "ab900": 1.4
                }
              ],
              "xKey": "lb",
              "height": 320,
              "legend": true,
              "yWidth": 50,
              "variants": [
                {
                  "label": "Nº de clientes",
                  "yFormat": "number",
                  "series": [
                    {
                      "key": "novos",
                      "name": "Clientes novos",
                      "color": "sage",
                      "stackId": "a"
                    },
                    {
                      "key": "recor",
                      "name": "Clientes recorrentes",
                      "color": "navy",
                      "stackId": "a"
                    }
                  ]
                },
                {
                  "label": "Valor (€)",
                  "yFormat": "kEur",
                  "tooltip": {
                    "valueFormat": "eur"
                  },
                  "series": [
                    {
                      "key": "vNovos",
                      "name": "Clientes novos",
                      "color": "sage",
                      "stackId": "a"
                    },
                    {
                      "key": "vRecor",
                      "name": "Clientes recorrentes",
                      "color": "navy",
                      "stackId": "a"
                    }
                  ]
                }
              ]
            },
            {
              "type": "note",
              "tone": "good",
              "text": "**Agosto teve uma divisão equilibrada entre novos e recorrentes.** Cerca de 57% novos e 43% recorrentes. É mais equilibrada do que os agostos anteriores (84% novos em 2023, 65% em 2024, 60% em 2025). Dados do Artsoft, aproximados."
            }
          ]
        },
        {
          "type": "card",
          "eyebrow": "Recência",
          "title": "Há quanto tempo tinham comprado os clientes recorrentes",
          "subtitle": "Dos clientes recorrentes da campanha, há quanto tempo foi a compra anterior.",
          "blocks": [
            {
              "type": "barChart",
              "data": [
                {
                  "faixa": "Até 6 meses",
                  "n": 118,
                  "pct": 54,
                  "color": "sage",
                  "recExtra": "Desde a compra anterior"
                },
                {
                  "faixa": "6 a 12 meses",
                  "n": 49,
                  "pct": 22,
                  "color": "slate",
                  "recExtra": "Desde a compra anterior"
                },
                {
                  "faixa": "1 a 2 anos",
                  "n": 32,
                  "pct": 15,
                  "color": "slate",
                  "recExtra": "Desde a compra anterior"
                },
                {
                  "faixa": "2 a 5 anos",
                  "n": 21,
                  "pct": 10,
                  "color": "slate",
                  "recExtra": "Desde a compra anterior"
                }
              ],
              "xKey": "faixa",
              "height": 260,
              "yFormat": "percent",
              "barLabelFormat": "percent",
              "series": [
                {
                  "key": "pct",
                  "colorKey": "color"
                }
              ],
              "tooltip": {
                "valueFormat": "percent",
                "extraKey": "recExtra"
              }
            },
            {
              "type": "note",
              "text": "**Os recorrentes de agosto são clientes recentes, não adormecidos.** Mais de metade (54%) já tinha comprado nos últimos seis meses e três quartos (76%) no último ano. **Ressalva:** o histórico disponível começa em fevereiro de 2023, por isso a recência máxima medível é de cerca de três anos e meio."
            }
          ]
        },
        {
          "type": "row",
          "blocks": [
            {
              "type": "card",
              "eyebrow": "Ticket médio",
              "title": "Valor médio por compra",
              "subtitle": "Valor médio por compra em cada campanha.",
              "blocks": [
                {
                  "type": "barChart",
                  "data": [
                    {
                      "lb": "Ago/23",
                      "novos": 338,
                      "recor": 66,
                      "ticket": 2531,
                      "vNovos": 996312,
                      "vRecor": 248983,
                      "alto": 47.2,
                      "medio": 34.9,
                      "baixo": 15.8,
                      "ab900": 2.1,
                      "color": "slate"
                    },
                    {
                      "lb": "Ago/24",
                      "novos": 270,
                      "recor": 148,
                      "ticket": 2733,
                      "vNovos": 840382,
                      "vRecor": 509213,
                      "alto": 51.7,
                      "medio": 32.7,
                      "baixo": 13.9,
                      "ab900": 1.7,
                      "color": "slate"
                    },
                    {
                      "lb": "Ago/25",
                      "novos": 300,
                      "recor": 204,
                      "ticket": 2323,
                      "vNovos": 968194,
                      "vRecor": 464630,
                      "alto": 44.6,
                      "medio": 39.9,
                      "baixo": 14.4,
                      "ab900": 1.2,
                      "color": "slate"
                    },
                    {
                      "lb": "Mai/26",
                      "novos": 213,
                      "recor": 173,
                      "ticket": 2661,
                      "vNovos": 707985,
                      "vRecor": 546974,
                      "alto": 58.6,
                      "medio": 28.2,
                      "baixo": 11.5,
                      "ab900": 1.7,
                      "color": "slate"
                    },
                    {
                      "lb": "Jun/26",
                      "novos": 147,
                      "recor": 156,
                      "ticket": 2932,
                      "vNovos": 549648,
                      "vRecor": 477501,
                      "alto": 61.7,
                      "medio": 25.2,
                      "baixo": 11.8,
                      "ab900": 1.3,
                      "color": "slate"
                    },
                    {
                      "lb": "Ago/26",
                      "novos": 290,
                      "recor": 220,
                      "ticket": 2703,
                      "vNovos": 973579,
                      "vRecor": 712775,
                      "alto": 53.5,
                      "medio": 31,
                      "baixo": 14.1,
                      "ab900": 1.4,
                      "color": "sage"
                    }
                  ],
                  "xKey": "lb",
                  "height": 250,
                  "yFormat": "kEur",
                  "series": [
                    {
                      "key": "ticket",
                      "colorKey": "color"
                    }
                  ],
                  "tooltip": {
                    "valueFormat": "eur"
                  }
                },
                {
                  "type": "note",
                  "text": "O ticket médio de agosto (2.703 €) ficou acima do de agosto de 2025 (2.323 €), apesar de o desconto ter sido mais profundo. O desconto atraiu procura sem destruir o valor médio da compra."
                }
              ]
            },
            {
              "type": "card",
              "eyebrow": "Faixas de valor",
              "title": "Peso de cada faixa na receita",
              "subtitle": "Percentagem da receita por faixa de valor da compra.",
              "blocks": [
                {
                  "type": "barChart",
                  "data": [
                    {
                      "lb": "Ago/23",
                      "novos": 338,
                      "recor": 66,
                      "ticket": 2531,
                      "vNovos": 996312,
                      "vRecor": 248983,
                      "alto": 47.2,
                      "medio": 34.9,
                      "baixo": 15.8,
                      "ab900": 2.1
                    },
                    {
                      "lb": "Ago/24",
                      "novos": 270,
                      "recor": 148,
                      "ticket": 2733,
                      "vNovos": 840382,
                      "vRecor": 509213,
                      "alto": 51.7,
                      "medio": 32.7,
                      "baixo": 13.9,
                      "ab900": 1.7
                    },
                    {
                      "lb": "Ago/25",
                      "novos": 300,
                      "recor": 204,
                      "ticket": 2323,
                      "vNovos": 968194,
                      "vRecor": 464630,
                      "alto": 44.6,
                      "medio": 39.9,
                      "baixo": 14.4,
                      "ab900": 1.2
                    },
                    {
                      "lb": "Mai/26",
                      "novos": 213,
                      "recor": 173,
                      "ticket": 2661,
                      "vNovos": 707985,
                      "vRecor": 546974,
                      "alto": 58.6,
                      "medio": 28.2,
                      "baixo": 11.5,
                      "ab900": 1.7
                    },
                    {
                      "lb": "Jun/26",
                      "novos": 147,
                      "recor": 156,
                      "ticket": 2932,
                      "vNovos": 549648,
                      "vRecor": 477501,
                      "alto": 61.7,
                      "medio": 25.2,
                      "baixo": 11.8,
                      "ab900": 1.3
                    },
                    {
                      "lb": "Ago/26",
                      "novos": 290,
                      "recor": 220,
                      "ticket": 2703,
                      "vNovos": 973579,
                      "vRecor": 712775,
                      "alto": 53.5,
                      "medio": 31,
                      "baixo": 14.1,
                      "ab900": 1.4
                    }
                  ],
                  "xKey": "lb",
                  "height": 250,
                  "legend": true,
                  "yFormat": "percent",
                  "yDomain": [
                    0,
                    100
                  ],
                  "tooltip": {
                    "valueFormat": "percent"
                  },
                  "series": [
                    {
                      "key": "alto",
                      "name": "Alto (5.000€+)",
                      "color": "navy",
                      "stackId": "a"
                    },
                    {
                      "key": "medio",
                      "name": "Médio (2.000–4.999€)",
                      "color": "gold",
                      "stackId": "a"
                    },
                    {
                      "key": "baixo",
                      "name": "Baixo (900–1.999€)",
                      "color": "slate",
                      "stackId": "a"
                    },
                    {
                      "key": "ab900",
                      "name": "Abaixo 900€",
                      "color": "terracotta",
                      "stackId": "a"
                    }
                  ]
                },
                {
                  "type": "note",
                  "text": "Em agosto, as compras de valor alto pesaram 53,5% da receita, mais do que em agosto de 2025 (44,6%) mas menos do que em maio (58,6%) e junho (61,7%). Dados do Artsoft, aproximados."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
