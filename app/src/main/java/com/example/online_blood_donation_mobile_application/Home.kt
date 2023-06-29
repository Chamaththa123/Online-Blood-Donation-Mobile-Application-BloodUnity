package com.example.online_blood_donation_mobile_application

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class Home : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        val donate = findViewById<Button>(R.id.donate)
        val request = findViewById<Button>(R.id.request)

        donate.setOnClickListener {
            val intent = Intent(this, Donate::class.java)
            startActivity(intent)
        }

        request.setOnClickListener {
            val intent = Intent(this, Request::class.java)
            startActivity(intent)
        }
    }
}