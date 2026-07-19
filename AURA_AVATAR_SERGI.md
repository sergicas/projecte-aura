# AURA AVATAR SERGI

Contracte de vincle entre Aura i Sergi Avatar.

## Estat

```yaml
versio: cloud-v5.3
fase: ia-conversacional
format: aura-avatar-sergi-bridge-v1
document_canonic: AURA_AVATAR_SERGI.md
data: 2026-07-19
```

## Funcions separades

```text
Sergi Avatar = veu pública, corpus literari, llibres i filosofia.
Aura = memòria privada, decisions, continuïtat i verificació del Projecte Aura.
```

El vincle és un pont, no una fusió d'identitats. Aura no envia records, diari, gens ni coneixement privat a Sergi Avatar.

## Implementació real

- `GET /api/avatar-sergi` exposa el contracte del pont.
- `POST /api/avatar-sergi/chat` envia únicament la pregunta escrita explícitament per Sergi i un identificador de sessió.
- A la web, el botó `Parla amb Sergi Avatar` prepara el prefix `avatar:`; també es pot escriure `sergi avatar:`.
- La resposta externa es mostra diferenciada i no s'escriu a D1, KV, diari ni genoma.
- El servei públic està vinculat des de `sergicastillo.com` i indica que les converses s'arxiven anònimament per millorar el bot.

## Salvaguardes

- Cap delegació automàtica de preguntes.
- Cap ingestió automàtica del corpus o de les respostes.
- Cap enviament de context recuperat de la memòria d'Aura.
- Cap capacitat d'escriptura de Sergi Avatar sobre Aura.
- Qualsevol persistència futura d'un resum requerirà una acció separada i explícita de Sergi.

## Fórmula canònica

Aura conserva el camí. Sergi Avatar obre la conversa amb l'obra.
