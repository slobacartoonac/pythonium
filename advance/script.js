const canvas = document.getElementById('canvas');
canvas.width = canvas.height = 500;
canvas.style.backgroundColor = 'rgb(255, 255, 255)';
const ctx = canvas.getContext('2d');

const cols = 25;
const rows = 25;
const cellSize = canvas.width / cols;
const dt = 0.3
const diffusion = 0.01;
const travel = 0.01

const obstacle = {
  x1: 8,
  y1: 5,
  x2: 12,
  y2: 12
};

let grid = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => [0, 0])
);

const particleCount = 500;
const particles = Array.from({ length: particleCount }, () => ({
  x: Math.random() * cols,
  y: Math.random() * rows,
  vx: 0,
  vy: 0,
  px: 0, // previous x
  py: 0  // previous y
}));


// Injected by mouse
let isMouseDown = false;
let prevMouse = null;

canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  prevMouse = getMouseCell(e);
});

canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
  prevMouse = null;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isMouseDown) return;
  const curr = getMouseCell(e);
  if (!prevMouse) {
    prevMouse = curr;
    return;
  }

  const dx = curr.x - prevMouse.x;
  const dy = curr.y - prevMouse.y;

  injectVelocity(curr.x, curr.y, dx, dy);
  prevMouse = curr;
});

function getMouseCell(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  return {
    x: mx / cellSize,
    y: my / cellSize
  };
}

function injectVelocity(x, y, dx, dy) {
  const radius = 1.5;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      const cx = Math.floor(x + i);
      const cy = Math.floor(y + j);
      if (cx >= 0 && cx < cols && cy >= 0 && cy < rows) {
        const dist = Math.hypot(i, j);
        if (dist < radius) {
          const falloff = 1 - dist / radius;
          grid[cy][cx][0] += dx * falloff * 0.5;
          grid[cy][cx][1] += dy * falloff * 0.5;
        }
      }
    }
  }
}


function stepSimulation() {
  // injectVelocity(8,15, 0.03, -0.01)

  // injectVelocity(18,5, -0.04, 0.01)

  injectVelocity(19,22, -0.035, -0.10)

  const pressure = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  // Step 1: Compute pressure from speed
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const [vx, vy] = grid[y][x];
      const speed = Math.hypot(vx, vy);
      pressure[y][x] = 1 / (speed + 1); // Inverse speed (Venturi effect)
    }
  }

  const newGrid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => [0, 0])
  );

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const [vx, vy] = grid[y][x];
      const speed = Math.hypot(vx, vy);
      const px = pressure[y][x];

      let fx = 0;
      let fy = 0;

      // Step 2A: Pull from neighbors (pressure gradient)
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;

          const nx = (x + dx + cols) % cols;
          const ny = (y + dy + rows) % rows;

          const dist = Math.hypot(dx, dy);
          const dirX = dx / dist;
          const dirY = dy / dist;

          const dp = px - pressure[ny][nx]; // pull from high pressure
          fx += dirX * dp;
          fy += dirY * dp;
        }
      }

// Apply pressure + velocity forward propagation
let vxNew = vx + fx * 0.035;
let vyNew = vy + fy * 0.035;

// Forward push step (replaces the old simple one)
if (speed > 0.001) {
  const ux = vx / speed;
  const uy = vy / speed;

  for (let ddy = -1; ddy <= 1; ddy++) {
    for (let ddx = -1; ddx <= 1; ddx++) {
      const nx = (x + ddx + cols) % cols;
      const ny = (y + ddy + rows) % rows;

      const dispMag = Math.hypot(ddx, ddy);
      if (dispMag === 0) continue;

      const dxn = ddx / dispMag;
      const dyn = ddy / dispMag;

      const alignment = ux * dxn + uy * dyn; // dot product
      if (alignment <= 0) continue; // only forward

      const weight = alignment * 0.046 * speed;

      newGrid[ny][nx][0] += dxn * weight + ux * weight;
      newGrid[ny][nx][1] += dyn * weight + uy * weight;
    }
  }

  // // Retain part of it at the origin
  // vxNew *= 0.88;
  // vyNew *= 0.88;
}

newGrid[y][x][0] += vxNew;
newGrid[y][x][1] += vyNew;
    }
  }

  // Step 3: Damping
  const damping = 0.825;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      newGrid[y][x][0] *= damping;
      newGrid[y][x][1] *= damping;
    }
  }

  // add dead zone
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (distanceToSegment(x, y, obstacle.x1, obstacle.y1, obstacle.x2, obstacle.y2).dist < 1) {
        newGrid[y][x][0] = 0;
        newGrid[y][x][1] = 0;
      }
    }
  }

  grid = newGrid;
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGridLines();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const vec = grid[y][x];
      const cx = x * cellSize + cellSize / 2;
      const cy = y * cellSize + cellSize / 2;

      const scale = cellSize * 2;
      const dx = vec[0] * scale;
      const dy = vec[1] * scale;

      drawArrow(cx, cy, cx + dx, cy + dy);
    }
  }
  ctx.fillStyle = 'blue';
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x * cellSize, p.y * cellSize, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(obstacle.x1 * cellSize, obstacle.y1 * cellSize);
  ctx.lineTo(obstacle.x2 * cellSize, obstacle.y2 * cellSize);
  ctx.stroke();
}

function drawGridLines() {
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  for (let x = 0; x <= cols; x++) {
    const px = x * cellSize;
    ctx.beginPath();
    ctx.moveTo(px, 0);
    ctx.lineTo(px, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y <= rows; y++) {
    const py = y * cellSize;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(canvas.width, py);
    ctx.stroke();
  }
}

function drawArrow(x1, y1, x2, y2) {
  const headlen = 5;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
  ctx.stroke();
}


function distanceToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq === 0) return Math.hypot(px - x1, py - y1);

  let t = ((px - x1) * dx + (py - y1) * dy) / lengthSq;
  t = Math.max(0, Math.min(1, t));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return {
    dist: Math.hypot(px - projX, py - projY),
    normal: { x: px - projX, y: py - projY }
  };
}


function crossesLine(x0, y0, x1, y1, x2, y2, x3, y3) {
  // Line segments: (x0,y0)-(x1,y1) and (x2,y2)-(x3,y3)
  function ccw(ax, ay, bx, by, cx, cy) {
    return (cy - ay) * (bx - ax) > (by - ay) * (cx - ax);
  }
  return ccw(x0, y0, x2, y2, x3, y3) !== ccw(x1, y1, x2, y2, x3, y3) &&
         ccw(x0, y0, x1, y1, x2, y2) !== ccw(x0, y0, x1, y1, x3, y3);
}

function reflectPointAcrossLine(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const a = dx * dx + dy * dy;
  const b = 2 * (dx * (x1 - px) + dy * (y1 - py));
  const t = -b / (2 * a);

  const projX = x1 + dx * t;
  const projY = y1 + dy * t;

  return {
    x: 2 * projX - px,
    y: 2 * projY - py
  };
}

function updateParticles() {
  for (const p of particles) {
    if(Math.random() < 0.0005) {
      p.x = Math.random() * cols;
      p.y = Math.random() * rows;
      return
    }
    // Get integer cell
    const x0 = Math.floor(p.x) % cols;
    const y0 = Math.floor(p.y) % rows;
    const x1 = (x0 + 1) % cols;
    const y1 = Math.min(y0 + 1, rows - 1);

    const sx = p.x - x0;
    const sy = p.y - y0;
    
    // injectVelocity(x0, y0, -sx*0.001, -sy*0.001)
    // injectVelocity(x1, y1, sx*0.001, sx*0.001)

    // Bilinear interpolation of velocity
    const v00 = grid[y0][x0];
    const v10 = grid[y0][x1];
    const v01 = grid[y1][x0];
    const v11 = grid[y1][x1];

    const vx = (1 - sx) * (1 - sy) * v00[0] +
               sx * (1 - sy) * v10[0] +
               (1 - sx) * sy * v01[0] +
               sx * sy * v11[0];

    const vy = (1 - sx) * (1 - sy) * v00[1] +
               sx * (1 - sy) * v10[1] +
               (1 - sx) * sy * v01[1] +
               sx * sy * v11[1];
    // injectVelocity(x0, y0, -sx*0.001, -sy*0.001)
    // injectVelocity(x1, y1, sx*0.001, sx*0.001)
    // injectVelocity(x0, y0, -vx*dt*0.01, -vy*dt*.01)
    p.x = (p.x + vx * dt + cols) % cols;
    p.y = (p.y + vy * dt + rows) % rows;
  }
}

function update() {
  stepSimulation();
  updateParticles();
  draw();
  requestAnimationFrame(update);
}

update();

