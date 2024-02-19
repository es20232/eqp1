-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(64) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `profile_picture` LONGBLOB NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResetCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(6) NOT NULL,
    `expiration` DATETIME(3) NOT NULL,
    `userEmail` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `ResetCode_code_key`(`code`),
    UNIQUE INDEX `ResetCode_userEmail_key`(`userEmail`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publication_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `descricao` VARCHAR(1024) NOT NULL,
    `userId` INTEGER NOT NULL,
    `post_image` LONGBLOB NOT NULL,

    INDEX `Post_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Interaction` (
    `postId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `like` BOOLEAN NOT NULL DEFAULT false,
    `deslike` BOOLEAN NOT NULL DEFAULT false,
    `comment` VARCHAR(250) NULL,
    `commentDate` DATETIME(3) NULL,

    INDEX `Interaction_postId_idx`(`postId`),
    INDEX `Interaction_userId_idx`(`userId`),
    PRIMARY KEY (`userId`, `postId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
