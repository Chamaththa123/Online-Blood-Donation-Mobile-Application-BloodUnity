package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import com.example.online_blood_donation_mobile_application.R

class Home : AppCompatActivity() {
    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val donate = findViewById<Button>(R.id.donate)
        val request = findViewById<Button>(R.id.request_b)
        val admin = findViewById<ImageView>(R.id.admin)

        donate.setOnClickListener {
            val intent = Intent(this, Donate::class.java)
            startActivity(intent)
        }

        request.setOnClickListener {
            val intent = Intent(this, Request::class.java)
            startActivity(intent)
        }

        admin.setOnClickListener {
            val intent = Intent(this, Login::class.java)
            startActivity(intent)
        }
    }
}