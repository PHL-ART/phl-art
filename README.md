# PHL-ART

### About

Just a homepage with amazing 3D mesh gradient and redirection link to my telegram channel.


### Stack

- Vanilla JS
- ThreeJS
- GLSL
- GSAP (Not using right now)


### Deployment

Build docker image:

```
docker build -t phl-art .
```

Run app on port 3000
```
docker run -p 3000:80 phl-art
```

Run app on port 3000 as daemon
```
docker run -p 3000:80 -d phl-art
```

### TODO
- [ ] Add Logo SVG Animation with GSAP
- [ ] Add Pallete algorythm that will depends on current client time and season
- [ ] Add gradient radnomize button
- [x] Add more Palletes