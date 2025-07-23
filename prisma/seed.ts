import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (isExistSuperAdmin) {
      console.log("Super Admin Already Exist");
      return;
    }

    const superAdmin = await prisma.user.create({
      data: {
        email: "super@gmail.com",
        password: "superadmin",
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
            // email: "super@gmail.com",
            contactNumber: "0123456789",
          },
        },
      },
    });

    console.log("Super Admin Created Successfully", superAdmin);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
