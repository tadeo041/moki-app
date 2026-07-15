import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Crear usuario de prueba
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      password: hashedPassword,
      name: 'Usuario Test',
    },
  });

  console.log('✅ Usuario creado:', user.email);

  // Crear motos de prueba
  const motorcycles = [
    {
      name: 'Yamaha FZ25 2024',
      pricePerHour: 150,
      cc: 250,
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500',
      maxSpeed: '140 Km/h',
      mileage: '15,000 Km',
      consumption: '35 KM/L',
      type: 'Deportiva',
      cylinders: '2 cilindros',
      brakes: 'ABS Doble Canal',
      description: 'Ideal para reparto - 150cc',
    },
    {
      name: 'Honda CB500 2023',
      pricePerHour: 200,
      cc: 500,
      year: 2023,
      imageUrl: 'https://images.unsplash.com/photo-1558981801-9dc6b4b4c1c6?w=500',
      maxSpeed: '180 Km/h',
      mileage: '8,000 Km',
      consumption: '30 KM/L',
      type: 'Naked',
      cylinders: '2 cilindros',
      brakes: 'ABS Doble Canal',
      description: 'Perfecta para viajes largos',
    },
    {
      name: 'Kawasaki Ninja 400',
      pricePerHour: 250,
      cc: 400,
      year: 2023,
      imageUrl: 'https://images.unsplash.com/photo-1558981801-9dc6b4b4c1c6?w=500',
      maxSpeed: '190 Km/h',
      mileage: '5,000 Km',
      consumption: '28 KM/L',
      type: 'Deportiva',
      cylinders: '2 cilindros',
      brakes: 'ABS Doble Canal',
      description: 'Deportiva de alto rendimiento',
    },
  ];

  for (const moto of motorcycles) {
    await prisma.motorcycle.create({
      data: moto,
    });
  }

  console.log(`✅ ${motorcycles.length} motos creadas`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });