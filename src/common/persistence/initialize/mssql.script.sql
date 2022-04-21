IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'NEW_APP_NAME')
  BEGIN
    CREATE DATABASE [NEW_APP_NAME]
  END
GO

USE [NEW_APP_NAME]
GO
/****** Object:  Table [dbo].[wallet_balance]    Script Date: 7/07/2020 01:28:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE IF NOT EXISTS [dbo].[wallet_balance](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[user_id] [int] NOT NULL,
	[amount] [decimal](18, 2) NOT NULL,
	[created_at] [datetime] NULL,
	[updated_at] [datetime] NULL,
 CONSTRAINT [PK_wallet_balance] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
